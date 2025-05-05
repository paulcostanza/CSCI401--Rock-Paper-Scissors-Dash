import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth-route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectionToDatabase } from './database/connectionToDatabase.js'

dotenv.config()

console.log("*****************************")

//const corsOrigin = process.env.CORS_ORIGIN

const app = express()

// get => request data from a server, is read only
// the terminal is the server, the web browser is the client
app.get('/', (req, res) => {
    res.send('Hello World!!')
})

// .use => adds the router to the middleware handling path
app.use(cors({
    origin: process.env.CORS_ORIGIN, // "http://localhost:5173", //
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// app.options('*', cors())


connectionToDatabase()

// use and add the router to the middleware handling path
// this will prefix every endpoint we define on the inside of a route
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port 3000`)
})