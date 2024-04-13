import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'
    
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const fileUploadOnCloudinary = async (localFilePath)=>{
try {
    if(!localFilePath) return null
    // Uploade file on cloudniary
   const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type: "auto"
    })

    // File Uploaded Sucessfully
console.log("File Is upoaded Sucessfully",response.url)
return response
} catch (error) {
    fs.unlinkSync(localFilePath)
    return null
}
}


export {fileUploadOnCloudinary} ;
