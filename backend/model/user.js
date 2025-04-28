import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    singlePlayer: {
        highScore: {
            type: Number,
            default: 0
        },
        totalScore: {
            type: Number,
            default: 0
        },
        totalGamesPlayed: {
            type: Number,
            default: 0
        }
    }
})

export const User = mongoose.model("User", userSchema) 