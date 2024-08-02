import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema(
    {
        userId : {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        collegeName:{
            type:String,
            required:true
        },
        degree:{
            type:String,
            required:true
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date,
            required:true
        },
        cgpa:{
            type:String,
            required:true
        },
    }
)

export const Education = mongoose.model("Education",educationSchema)