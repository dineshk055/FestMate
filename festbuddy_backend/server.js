import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import serverRoutes from "./routes/serverRoutes.js"

import cors from 'cors'

dotenv.config();


connectDB();

const myapp =express();

myapp.use(cors())

myapp.use(express.json())

// http://localhost:3000/api/auth

myapp.use("/api/auth/",serverRoutes)




const PORT = process.env.PORT || 5000

myapp.listen(PORT,()=>{
    console.log(`server connected successfully http://localhost:${PORT}`);
    
});

// http://localhost:3000