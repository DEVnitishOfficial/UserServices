
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

const uploadOnCloudinary = async(localfilepath) => {
    try{
        if(!localfilepath) return null
        const response = await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto", 
        folder: "public_info",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",   
        })
      fs.unlinkSync(localfilepath)
    console.log('response from cloudinary',response)
      return response
    }catch(error){
        fs.unlinkSync(localfilepath)
        console.log('got some error',error)
        return null
    }
}

export {
    uploadOnCloudinary
}

