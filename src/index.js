// import { configDotenv } from "dotenv";
// -r dotenv/config --experimental-json-modules
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
dotenv.config();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log(`MongoDb connection failed ${err}`);
});