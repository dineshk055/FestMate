import festDetailsModel from "../models/festDetailModels.js";

export const festivalRegister =async(req,res)=>{

    try {
        const{eventName,hostName,date,time,location,helpersNeeded,eventType,status,address,hostNumber} =req.body;
        const festDetails =await festDetailsModel.create({eventName,hostName,date,time,location,helpersNeeded,eventType,status,hostNumber})

        res.status(201).json({
            msg:"Event Registered Successfully",festDetails
        })
        
    } catch (error) {

        console.log("Error in fest Details register",error)
        
    }

}

export const getEventDetails =async(req,res)=>{
    try {

        const getEvent =await festDetailsModel.find();

        res.status(201).json({
            msg:"event details fetched successfully",getEvent
        })

    } catch (error) {

        console.log("Error in getEventDetails");
        
        
    }
}