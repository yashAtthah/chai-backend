import express from "express";
import cors  from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit : "16kb"}));                      // To pass json data
app.use(express.urlencoded({extended:true, limit:"16kb"}));   // To pass urlencoded data
app.use(express.static("public"))                             // To make folder static
app.use(cookieParser())                                       // To set-get cookies on browser

/* Routes -- Import */
import userRouter from "./routes/user.routes.js"


/* Routes -- Declare */
app.use("/api/v1/users",userRouter);


export { app };