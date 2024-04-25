import Aadhar from "../model/AadharSchema.js";
import QRGenerator from "../utils/QRGenerator.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const submitAadharForm = async(req,res) => {
    const {hinName,engName,DOB,gender,aadharNo,address,hinAddress, aadharIssueDate} = req.body;
    if([hinName || engName || DOB || gender || aadharNo || address || hinAddress || aadharIssueDate].some((field) => field.trim() === "")){
        throw new Error("every field is required")
    }

    try {
        let data = {
            "name":engName,
            "address":address,
            "description":`${aadharNo} The generated Aadhar card is based on manually entered data and may not exactly match the Aadhar card database. It is provided for informational purpose only and should not be considerd an official document or a replacement for the original UIDI-issued Aadhar card.`
        }
      
        const qrCodefilePath = await QRGenerator(data)
        console.log('qrcode from controller>>>',qrCodefilePath)
        const cloudUploadQR = await uploadOnCloudinary(qrCodefilePath)
            if(!cloudUploadQR?.url){
             throw new Error("Got error while uploading avatar")
            }

        const avatarLocalPath =  req.file?.path
        console.log('avatarlocalfilepath',avatarLocalPath)
            const cloudUpload = await uploadOnCloudinary(avatarLocalPath)
            if(!cloudUpload?.url){
             throw new Error("Got error while uploading avatar")
            }
        const AadharInfo = await Aadhar.create({
            hinName,
            engName,
            DOB,
            gender,
            aadharNo,
            address,
            hinAddress,
            aadharIssueDate,
          avatar: {
            public_id: cloudUpload.public_id,
            secure_url:cloudUpload.secure_url
          },
          QRCode: {
            public_id: cloudUploadQR.public_id,
            secure_url:cloudUploadQR.secure_url
          }
        });
        const savedAadharInfo = await AadharInfo.save();
        return res.status(200).json({
          success:true,
          data:savedAadharInfo
        })
      } catch (error) {
        return res.status(400).json({
          message: error.message,
        });
      }

}

const getAadharInfo = async(req,res) => {
    try {
    const aadharInfo = await Aadhar.findOne({ engName : new RegExp(`^${req.params.engName}$`, "i"), });

      if (!aadharInfo){
        return res.status(404).json({
          success: false,
          message: "aadharInfo not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: aadharInfo,
      });

    } catch (error) {
       return res.status(400).json({
      success: false,
      message: error.message,
    });
    }
}

export {submitAadharForm, getAadharInfo} 