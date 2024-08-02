import mongoose,{Schema} from "mongoose";

const achivementSchema = new Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        organization:{
            type:String,
            required:true,
        },
        achievementTitle:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            required:true,

        },
        url:{
            type:String,
            required:true,
        }
    }
)

export const Achievement = mongoose.model("Achievement",achivementSchema)