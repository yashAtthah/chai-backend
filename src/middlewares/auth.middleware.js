import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"; 
import { User } from "../models/user.models";

export const verifyJWT = asyncHandler(async (req,res,next) => {        // If res is not used then we can replace it with _
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ","");
    
        if(token){
            throw new ApiError(401,"Unauthorized token")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        
        if(!user){
            throw new ApiError(401,"Invalid access token")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token");
    }
})