import express from "express"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"


import dotenv from "dotenv"
import mongoose from "mongoose"
import connectMongoDB from "./db/connectMongodb.js"
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary'



dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})


const app = express()
const __dirname = path.resolve()
app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
const PORT = process.env.PORT || 3000

app.get('/test', (req, res) => {
    res.send('Test route works!');
  });
  

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/notifications",notificationRoutes)

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend/dist/index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectMongoDB()
})