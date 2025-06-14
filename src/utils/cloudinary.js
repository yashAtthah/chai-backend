import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: "dhzja0trm",                       //process.env.CLOUDINARY_CLOUD_NAME,
    api_key: "711842789727916",                    //process.env.CLOUDINARY_API_KEY,
    api_secret: "3RgoAvNnBMu48gGYNURgfICZg6Q"      //process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        /* Upload the file on cloudinary */
        const uploadResult = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto'});
        /* File has been uploaded successfully */
        
        // console.log(`File upload successfully output: ${uploadResult.url}`);
        // console.log(`File upload successfully output: ${uploadResult}`);
        fs.unlinkSync(localFilePath);
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath);  /* remove the locally saved temporary file as the upload operation got failed */
        return null;
    }
}

export {uploadOnCloudinary};