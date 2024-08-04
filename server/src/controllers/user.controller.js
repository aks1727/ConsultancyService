import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {parse, isValid} from "date-fns"


const accessTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
};

const refreshTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
};

const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};
// basic authentication methods for user
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, name, phoneNumber, password } = req.body;
    if (!email || !username || !password || !phoneNumber || !name) {
        throw new ApiError(404, "Missing Credentials");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new ApiError(403, "User already Exists");
    }
    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        username,
    });
    if (!user) {
        throw new ApiError(500, "Error occured while Registering user user");
    }
    const { accessToken, refreshToken } = await generateTokens(user._id);
    const finalUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(new ApiResponse(200, finalUser, "User creation Success"));
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(404, "Missing Credentials");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not Found");
    }
    const finalUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    const { accessToken, refreshToken } = await generateTokens(user._id);
    return res
        .status(201)
        .cookie("accessToken", accessToken, accessTokenOptions)
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .json(new ApiResponse(201, finalUser, "User Login Success"));
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(202)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(202, {}, "User logged out"));
});

const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.data;
    if (!oldPassword || !newPassword || !confirmPassword) {
        throw new ApiError(404, "Missing Credentials");
    }
    if (newPassword !== confirmPassword) {
        throw new ApiError(406, "password didn't matched");
    }
    const user = await User.findById(req.user._id);
    const isCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isCorrect) {
        throw new ApiError(401, "Password Incorrect");
    }
    user.password = newPassword;
    user.save({ validateBeforeSave: false });
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(201, req.user, "Success"));
});

// updation methods for user
const updateSkillsDetails = asyncHandler(async (req, res) => {
    const { skills } = req.body;
    console.log(skills);

    if (!skills || !Array.isArray(skills)) {
        throw new ApiError(404, "Missing Credentials");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.skills = skills;
    user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new ApiResponse(200, user, "No new skills to update"));

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: {
                skills: { $each: newSkills },
            },
        },
        {
            new: true,
        }
    );

    if (!updatedUser) {
        throw new ApiError(500, "Error occurred while updating skills details");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Skills details updated"));
});

const updateEducationDetails = asyncHandler(async (req, res) => {
    const { education } = req.body;

    if (!education || !Array.isArray(education)) {
        throw new ApiError(404, "Missing Credentials");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.educations = education.map((edu) => {
        const fromDate = parse(edu.from, 'd/M/yyyy', new Date());
        const toDate = parse(edu.to, 'd/M/yyyy', new Date());

        if (!isValid(fromDate) || !isValid(toDate)) {
            throw new ApiError(400, "Invalid date format. Use 'DD/MM/YYYY'.");
        }

        return {
            ...edu,
            from: fromDate,
            to: toDate,
        };
    });
    user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Education details updated"));
});

const updateAchievements = asyncHandler(async (req, res) => {


});

const updateExperienceDetails = asyncHandler(async (req, res) => {
    const { id, title, duration, company, location, description, isWorking } =
        req.body;
    if (!id || !title || !duration || !company || !location || !description) {
        throw new ApiError(404, "Missing Credentials");
    }
    const working = Boolean(isWorking);
    const experience = await Experience.findByIdAndUpdate(id, {
        title,
        duration,
        company,
        location,
        description,
        isWorking: working,
    });
    if (!experience) {
        throw new ApiError(
            500,
            "Error occured while updating experience details"
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, experience, "Experience details updated"));
});

export default {
    // basic authentication
    registerUser,
    loginUser,
    logoutUser,
    changeUserPassword,
    getCurrentUser,

    // updation methods
    updateEducationDetails,
    updateExperienceDetails,
    updateSkillsDetails,
    updateAchievements,
};
