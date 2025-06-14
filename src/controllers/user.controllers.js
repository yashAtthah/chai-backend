import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exist");
    }

    console.log(req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files?.coverImage[0]?.path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(409, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(409, "Avatar file is required");
    }

    const user = await User.create({fullname:fullName, avatar:avatar.url, coverImage:coverImage?.url || "", email, password, username:username.toLowerCase()});

    const createdUser = await User.findById(user._id).select("-password -refreshToken");        // By default every value is selected // -password will remove password, -refreshToken will remove refreshToken

    if(!createdUser){
        throw new ApiError(500, "Something wentr wrong while registering the user");
    }

    return res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully"));

})

export { registerUser };