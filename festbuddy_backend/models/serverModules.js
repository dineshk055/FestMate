import mongoose from 'mongoose';

const datasSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    phone:String,
    dateOfBirth:String,
    password:String,
    confirmPassword:String,
    acceptTerms:Boolean
    
})

const serverModule = mongoose.model("User_Register_Details",datasSchema) 

export default serverModule;