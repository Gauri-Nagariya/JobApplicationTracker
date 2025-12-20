import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import homeRoute from './routes/homeRoute.js'
import profileRoute from './routes/profileRoute.js'
import ApplicationRoute from './routes/ApplicationRoute.js'
import DocumentRoute from './routes/DocumentRoute.js'
import auth from './middlewares/auth.js'
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();


app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true}));

const allowedOrigins = [
  // "https://job-application-tracker-ruby-ten.vercel.app",
"https://job-application-tracker-peach-seven.vercel.app",
  "http://localhost:5173", // keep for local dev
];

app.use( cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));

// app.use(cors({
//   origin: "http://localhost:5173", // your frontend URL
//   credentials: true, // if you send cookies/auth
// }));

app.use(cookieParser());

const PORT = process.env.PORT || 5000;
connectDB();

app.use('/', userRoute)
app.use('/', auth, homeRoute)
app.use('/', auth, profileRoute)
app.use('/', auth, ApplicationRoute)
app.use('/', DocumentRoute)


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})