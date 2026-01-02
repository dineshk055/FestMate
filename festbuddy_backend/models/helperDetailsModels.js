import mongoose from 'mongoose';
const helperSchema =new mongoose.Schema({
    name:String,
    location:String,
    contact:String,
    isAvailable:{
        type:Boolean,
        default: true
    },
    location:{
        type:{
            type:String,
            enum: ["Point"], // [longitude, latitude]
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    }
});


helperSchema.index({location: "2dsphere"});

const HelperModels = mongoose.model("helper_details",helperSchema)

export default HelperModels;