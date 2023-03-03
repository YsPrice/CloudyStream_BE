import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authentication.js';
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/videos.js";

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log('connected to mongo!')
    })
    .catch((err) => {
        throw err;
    });
};
// find .env file


app.use(cookieParser())
app.use(express.json());
app.use("/api/users", userRoutes);

app.use("/api/videos", videoRoutes)
app.use("/api/auth", authRoutes);



app.use((err, req,res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong!";
    return res.status(status).json({
        success:false,          
        status,
        message
    });
            
})

app.listen(port, () => {
connect()
    console.log(`connected to server! listening at port ${port}` )
})

