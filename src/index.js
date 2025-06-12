// import { configDotenv } from "dotenv";
// -r dotenv/config --experimental-json-modules
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
dotenv.config();

connectDB();