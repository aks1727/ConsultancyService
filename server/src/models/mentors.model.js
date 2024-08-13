import mongoose, { Schema } from "mongoose";

const mentorSchema = new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        linkedinProfile:{
            type:String,
        },
        resumeLink:{
            type:String,
        },
        sessionsTaken: {
            type: Number,
            default: 0
        },
        

    }
)

export const Mentor = mongoose.model("Mentor", mentorSchema);