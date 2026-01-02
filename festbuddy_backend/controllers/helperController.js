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


export const getHelperByLocation = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "lat & lng required" });
    }

    const helpers = await HelperModel.find({
      isAvailable: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)]
          },
          $maxDistance: 5000
        }
      }
    });

    res.json({
      count: helpers.length,
      helpers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
