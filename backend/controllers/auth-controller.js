// definition of handler functions
import { User } from '../model/user.js'
import bcrypt from 'bcryptjs'
import { generateVerificationToken } from '../utils/generateVerificationToken.js'
import { generateJWTToken } from '../utils/generateJWTToken.js'
import { sendVerificationEmail, sendThankYouForVerificationEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../resend/email.js"
import crypto from 'crypto'

export const signup = async (req, res) => {
    const { username, email, password } = req.body

    console.log(`username: ${username}`)
    console.log(`email: ${email}`)
    console.log(`password: ${password}`)
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All inputs are required!!" })
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
            verificationTokenExpiresAt: Date.now() + 86400000 // 24 hours
        })

        await user.save()

        // generate a JWT
        // res => response to set a cookie
        generateJWTToken(res, user._id)

        await sendVerificationEmail(user.email, user.username, verificationToken)

        // sends success status to the client (browser)
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
            return res.status(400).json({ success: false, message: "Invalid credentials, user email not in database" })
        }

        // compares the password user puts in vs password from database
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials, input does not match password!" })
        }

        const isVerified = user.isVerified

        if (!isVerified) {
            return res.status(400).json({ success: false, message: "Email not verified foo..." })
        }

        // after 3 checks we create the persistant sign on token
        generateJWTToken(res, user._id)

        res.status(200).json({
            success: true,
            message: "Login successful, welcome!"
        })

    } catch (error) {
        console.log("Yo foo, you have a login error!\n", error)
        res.status(400).json({ succcess: false, message: `Yo you have an error foo...\n${error.message}` })
    }
}

// clears the cookie that is used to verify user during their session
export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Logged out is a success!" })
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() } // greater than current date
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        // undefined will remove property from database

        await user.save()

        await sendThankYouForVerificationEmail(user.email, user.username)

        res.status(200).json({ success: true, message: "Thank you for verifying email sent successfully" })
    } catch (error) {
        console.log("error verifying email\n", error)
        res.status(400).json({ success: false, message: error.message })
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const resetPasswordToken = crypto.randomBytes(32).toString("hex")
        const resetPasswordExpiresAt = Date.now() + 24 * 60 * 60 * 1000 // 1 hour

        user.resetPasswordToken = resetPasswordToken
        user.resetPasswordExpiresAt = resetPasswordExpiresAt

        await user.save()
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)

        res.status(200).json({ success: true, message: "Password reset email sent successfully!" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params // from the URL params
        const { password } = req.body
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: "Your token is either invalid or expired" })
        }

        // everything checks out
        // hash new password and reset token data
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save()

        await sendResetSuccessEmail(user.email, user.username)
        res.status(200).json({ success: true, message: "Password reset successfully" })
    } catch (error) {
        console.log("error resetting password, no can do buckaroo...\n", error)
        res.status(400).json({ success: false, message: error.message })
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        res.status(200).json({ success: true, user: { ...user._doc, password: undefined } })
    } catch (error) {
        console.log("error checking auth", error)
        res.status(400).json({ success: false, message: error.message })
    }
}