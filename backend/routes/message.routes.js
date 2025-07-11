import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { getMessages, sendMessage } from '../controllers/message.controller.js'
import { upload } from '../middlewares/multer.js'


const messageRouter = express.Router()

messageRouter.post("/send/:receiver",isAuth,upload.single("image") ,sendMessage)
messageRouter.get("/get/:receiver",isAuth,getMessages)

export default messageRouter