import express from 'express';
import { register,login } from '../controllers/datascontroller.js';
import { festivalRegister,getEventDetails } from '../controllers/festivalControlle.js';
import { helperDetails, helperRegister } from '../controllers/helperController.js';

const routes=express.Router();


routes.post("/register",register);  // http://localhost:3000/api/auth/register

routes.post("/signin",login);  // http://localhost:3000/api/auth/signin

routes.post("/eventDetails",festivalRegister)  // http://localhost:3000/api/auth/eventDetails

routes.get("/getEventDetails",getEventDetails)    // http://localhost:3000/api/auth/getEventDetails

routes.post("/helperRegister",helperRegister)     // http://localhost:3000/api/auth/helperRegister

routes.get("/helperDetails",helperDetails)     // http://localhost:3000/api/auth/helperDetails



export default routes;