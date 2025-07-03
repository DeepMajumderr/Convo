import express from 'express'
import dotenv  from "dotenv"
import connectDb from './config/db.js'
// import authRouter from './routes/auth.routes.js'
dotenv.config()

const port = process.env.PORT || 5000

const app = express()

// app.use("/api/auth",authRouter)


app.listen(port,() => {
    connectDb()
    console.log(`Server started`)
})