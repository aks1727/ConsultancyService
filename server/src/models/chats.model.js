import mongoose, { Schema } from 'mongoose'

const chatSchema = new Schema(
    {
        chatName: {
            type: String,
            trim:true
        },
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref:"Message"
        }

    },{timestamps:true}
)

export const Chat = mongoose.model("Chat", chatSchema);