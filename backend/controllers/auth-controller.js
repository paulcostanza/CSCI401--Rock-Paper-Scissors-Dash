import { User } from '../model/user.js'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '../utils/generateVerificationToken.js'
import { generateJWTToken } from '../utils/generateJWTToken.js'
import { sendVerificationEmail, sendThankYouForVerificationEmail } from "../resend/email.js"

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const usernameAlreadyExists = await User.findOne({ username })
        const emailAlreadyExists = await User.findOne({ email })

        if (usernameAlreadyExists) {
            return res.status(400).json({ message: "Username already exists" })
        }

        if (emailAlreadyExists) {
            return res.status(400).json({ message: "Email is already taken" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = generateVerificationToken()

        const user = new User({
            username,
            email,
            password: hashedPassword,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })

        await user.save()

        // generate a JWT
        generateJWTToken(res, user._id)

        await sendVerificationEmail(user.email, user.username, verificationToken)

        res.status(201).json({
            success: true,
            message: "User was created successfully",
            user: {
                ...user._doc,
                password: undefined // do not want client to access unhashed password!
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

// checks if username exist, password is correct, & user is verifed
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        // compares the password user pust in vs password from database
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        const isVerified = user.isVerified

        if (!isVerified) {
            return res.status(400).json({ success: false, message: "Email not verified" })
        }

        generateJWTToken(res, user._id)

        res.status(200).json({
            success: true,
            message: "Login successful"
        })
    } catch (error) {
        console.log("error loggin in", error)
        res.status(400).json({ succcess: false, message: error.message })
    }
}

// clears the cookie that is used to verify user during their session
export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        await sendThankYouForVerificationEmail(user.email, user.username)

        res.status(200).json({ success: true, message: "Thank you for verifying email sent successfully" })
    } catch (error) {
        console.log("error verifying email\n", error)
        res.status(400).json({ success: false, message: error.message })
    }
}