import mongoose from 'mongoose';
const helperSchema =new mongoose.Schema({
    name:String,
    location:String,
    contact:String
})

const HelperModels = mongoose.model("helper_details",helperSchema)

export default HelperModels;