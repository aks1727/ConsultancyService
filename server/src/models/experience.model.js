import mongoose ,{ Schema } from "mongoose";

const experienceSchema = new Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        title:{
            type:String,
            required:true,
        },
        duration:{
            type:String,
            required:true,
        },
        company:{
            type:String,
            required:true,
        },
        location:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        isWorking:{
            type:Boolean,
            default:false,
        }
    }
)

export const Experience = mongoose.model('Experience',experienceSchema);