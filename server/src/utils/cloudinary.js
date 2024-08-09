import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({
    cloud_name: 'dytuks2qs',
    api_key:'688561455755436',
    api_secret: 'U3eL7QTqkR-OT64J8aOTbHxB0AI'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        // upload the file on cloudinary 
        console.log(`Trying  upload ${localFilePath}`)
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully 
        // console.log("file is uploaded on cloudinary",response.url)
        // console.log("Cloudinary response",response)
        console.log(`Successful upload of ${localFilePath}`)
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log('error',error)
        fs.unlinkSync(localFilePath) // remove the locallly saved temporary file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary };
