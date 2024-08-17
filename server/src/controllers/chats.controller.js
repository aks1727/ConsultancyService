import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Chat } from "../models/chats.model.js";

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        throw new ApiError(400, "User ID required");
    }
    const isChat = await Chat.find({
        $and: {
            {users}
        }
    })
})