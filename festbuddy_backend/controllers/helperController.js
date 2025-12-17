import HelperModels from "../models/helperDetailsModels.js";

export const helperRegister =async(req,res)=>{
    try {
        const{name,location,contact} = req.body

        const helperdetails =await HelperModels.create({name,location,contact});

        res.status(201).json({msg:"Helper registered successsfully",helperdetails})
    } catch (error) {
        res.status(401).json({msg:"Error in helper register controller",error})
        
    }
}

export const helperDetails =async(req,res)=>{
    try {
        const getHelper = await HelperModels.find()
        res.status(201).json({msg:"Datas fetched successfully",getHelper});
    } catch (error) {
        res.status(401).json({msg:"error in get a details from controller",error})
        
    }

}

export const getHelperByLocation = async (req,res)=>{
    try {
        const {location} = req.query;
        let helpers;
        if(location){
            helpers = await HelperModels.find({location});
        } else {
            helpers = await HelperModels.find();
        }

        res.status(200).json({
            count: helpers.length, helpers
        });
    } catch (error) {
        res.status(500).json({
            msg:"error in get helper details by location"
        });
    }

};