import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Education } from "../models/education.model.js";
import { Experience } from "../models/experience.model.js";
import { Achievement } from "../models/achievement.model.js";
import parseDateToUTC from "../utils/dateFormat.js";

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

// addition methods for user
const addEducationDetails = asyncHandler(async (req, res) => {
    const { collegeName, degree, from, to, cgpa } = req.body;

    if (!collegeName || !degree || !from || !to || !cgpa) {
        throw new ApiError(404, "Missing Credentials");
    }

    const fromDate = parseDateToUTC(from);
    const toDate = parseDateToUTC(to);

    if (isNaN(fromDate.getTime())) {
        throw new ApiError(400, "Invalid date format for 'from' field");
    }
    if (isNaN(toDate.getTime())) {
        throw new ApiError(400, "Invalid date format for 'to' field");
    }

    const education = await Education.create({
        userId: req.user._id,
        collegeName,
        degree,
        from: fromDate,
        to: toDate,
        cgpa,
    });

    if (!education) {
        throw new ApiError(
            500,
            "Error occurred while updating education details"
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, education, "Education details updated"));
});
const addExperienceDetails = asyncHandler(async (req, res) => {
    const { title, duration, company, location, description, isWorking } =
        req.body;
    if (!title || !duration || !company || !location || !description) {
        throw new ApiError(404, "Missing Credentials");
    }

    const working = Boolean(isWorking);

    const experience = await Experience.create({
        userId: req.user._id,
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
            "Error occured while adding  experience details"
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, experience, "Experience added"));
});

const addAchivementDetails = asyncHandler(async (req, res) => {
    const { organization, achievementTitle, date, url } = req.body;
    if (!organization || !achievementTitle || !date || !url) {
        throw new ApiError(404, "Missing Credentials");
    }
    const convertDate = parseDateToUTC(date);

    if (isNaN(convertDate.getTime())) {
        throw new ApiError(400, "Invalid date format");
    }

    const achievement = await Achievement.create({
        userId: req.user._id,
        organization,
        achievementTitle,
        date: convertDate,
        url,
    });
    if (!achievement) {
        throw new ApiError(
            500,
            "Error occured while adding achievement details"
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, achievement, "Achievement added"));
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

    const currentSkills = user.skills || [];
    const newSkills = skills.filter((skill) => !currentSkills.includes(skill));

    if (newSkills.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, user, "No new skills to update"));
    }

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

const updateAchievements = asyncHandler(async (req, res) => {
    const { id, organization, achievementTitle, date, url } = req.body;
    if (!id || !organization || !achievementTitle || !date || !url) {
        throw new ApiError(404, "Missing Credentials");
    }
    const convertDate = parseDateToUTC(date);
    if (isNaN(convertDate.getTime())) {
        throw new ApiError(400, "Invalid date format");
    }
    const achievement = await Achievement.findByIdAndUpdate(
        id,
        {
            organization,
            achievementTitle,
            date: convertDate,
            url,
        },
        {
            new: true,
        }
    );
    if (!achievement) {
        throw new ApiError(
            500,
            "Error occured while adding achievement details"
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, achievement, "Achievement added"));
});

const updateEducationDetails = asyncHandler(async (req, res) => {
    const { id, collegeName, degree, from, to, cgpa } = req.body;
    if (!id || !collegeName || !degree || !from || !to || !cgpa) {
        throw new ApiError(404, "Missing Credentials");
    }
    const fromDate = parseDateToUTC(from);
    const toDate = parseDateToUTC(to);
    const education = await Education.findByIdAndUpdate(id, {
        collegeName,
        degree,
        from: fromDate,
        to: toDate,
        cgpa,
    });
    if (!education) {
        throw new ApiError(
            500,
            "Error occured while updating education details"
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, education, "Education details updated"));
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

// deleting methods for user

const deleteEducation = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        throw new ApiError(404, "Missing Credentials");
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const allEducation = await Experience.find({ userId: user._id });

    if (user.isMentor && allEducation.length < 1) {
        throw new ApiError(
            403,
            "Mentors should have atleast one Education data"
        );
    }
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
        throw new ApiError(404, "Education not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, education, "Education deleted"));
});

const deleteExperience = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        throw new ApiError(404, "Missing Credentials");
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const allExperience = await Experience.find({ userId: user._id });
    if (user.isMentor && allExperience.length < 1) {
        throw new ApiError(
            403,
            "Mentors should have atleast one Experience data"
        );
    }
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
        throw new ApiError(404, "Experience not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, experience, "Experience deleted"));
});

const deleteAchievement = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        throw new ApiError(404, "Missing Credentials");
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const allAchievement = await Achievement.find({ userId: user._id });
    if (user.isMentor && allAchievement.length < 1) {
        throw new ApiError(
            403,
            "Mentors should have atleast one Achievement data"
        );
    }
    const achievement = await Achievement.findByIdAndDelete(id);
    if (!achievement) {
        throw new ApiError(404, "Achievement not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, achievement, "Achievement deleted"));
});

// fetching methods for user 

const getEducationDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const education = await Education.find({ userId: user._id }).sort({
        from: -1,
    });
    if (!education) {
        throw new ApiError(
            500,
            "Error occurred while fetching education details"
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, education, "Education details"));
});

const getExperienceDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const experience = await Experience.find({ userId: user._id }).sort({
        from: -1,
    });
    if (!experience) {
        throw new ApiError(
            500,
            "Error occurred while fetching experience details"
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, experience, "Experience details"));
});

const getAchievementDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const achievements = await Achievement.find({ userId: user._id }).sort({
        date: -1,
    });
    if (!achievements) {
        throw new ApiError(
            500,
            "Error occurred while fetching achievement details"
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, achievements, "Achievement details"));
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

    // adding methods
    addEducationDetails,
    addExperienceDetails,
    addAchivementDetails,

    //deletion methods
    deleteEducation,
    deleteExperience,
    deleteAchievement,

    // fetching details
    getEducationDetails,
    getExperienceDetails,
    getAchievementDetails,
};
