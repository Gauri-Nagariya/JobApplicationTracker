import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import homeRoute from './routes/homeRoute.js'
import profileRoute from './routes/profileRoute.js'
import ApplicationRoute from './routes/ApplicationRoute.js'
import auth from './middlewares/auth.js'
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));
app.use(cookieParser());

const PORT = process.env.PORT;
connectDB();

app.use('/', userRoute)
app.use('/', auth, homeRoute)
app.use('/', auth, profileRoute)
app.use('/', auth, ApplicationRoute)


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})