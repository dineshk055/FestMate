import mongoose from 'mongoose';

const festDetailSchema = new mongoose.Schema({
    eventName:String,
    hostName:String,
    hostNumber:String,
    date:String,
    time:String,
    location:String,
    helpersNeeded:String,
    eventType:String,
    address:String
})

const festDetailsModel = mongoose.model("festival_event_details",festDetailSchema);

export default festDetailsModel;