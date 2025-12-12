import serverModel from "../models/serverModules.js";
import bcrypt from 'bcrypt'

export const register =async(req,res)=>{
    try {

        const{fullName,email,phone,dateOfBirth,password,confirmPassword,acceptTerms}=req.body;

        const hash = await bcrypt.hash(password, 10);  

        const datasinsert = await serverModel.create({fullName,email,phone,dateOfBirth,password:hash,confirmPassword,acceptTerms})

        res.status(201).json({
            msg:"Account created successfully ",datasinsert
        })
        
    } catch (error) {
        console.log("error in controller",error);  
    }
}

export const login =async(req,res)=>{
    try {

        const {email,password}=req.body;

        if(!email || !password) {
            return res.status(404).json({msg:"Please fill the all Feild"})
        }

        const datasCheck= await serverModel.findOne({email});

         if (!datasCheck) {
      return res.status(404).json({ success: false, msg: "User not registered" });
    }

    

    // Check password
    const isMatch =await bcrypt.compare(password, datasCheck.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, msg:"Incorrect password"});
    }

    console.log(isMatch)

    //login successfull

    const datas = {id: datasCheck._id,fullName: datasCheck.fullName,email: datasCheck.email}

   return res.status(200).json({msg:"logged successfuly",datas})
        
    } catch (error) {
        console.log("error in login controller",error);
        res.status(500).json({
            success:false,
            msg:"server error"
        })  
    }
}



 