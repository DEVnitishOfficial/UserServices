import emailValidator from "email-validator";
import User from "../model/userInfoSchema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const submitForm = async (req, res, next) => {
  const { fullName, email } = req.body;
  console.log('reqbody from clientNow',fullName,email)

  if (!fullName) {
    return res.status(400).json({
      success: false,
      message: "Full name is required",
    });
  }

  // Check if email is provided and if it is, validate it
  if (email && email.trim() !== "") {
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address 📩",
      });
    }
  }

    // Check if userName already exists in the database
    const existingUserName = await User.findOne({ fullName });
    if (existingUserName) {
      return res.status(400).json({
        success: false,
        message: `Account already exists with the provided name ${fullName} 😒`,
      });
    }

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `Account already exists with the provided email ${email} 😒`,
      });
    }

  try {
    const avatarLocalPath =  req.file?.path
        const cloudUpload = await uploadOnCloudinary(avatarLocalPath)
        if(!cloudUpload?.url){
         throw new Error("Got error while uploading avatar")
        }
    const userInfo = await User.create({
      fullName,
      email,
      avatar: {
        public_id: cloudUpload.public_id,
        secure_url:cloudUpload.secure_url
      },
    });
    const savedInfo = await userInfo.save();
    return res.status(200).json({
      success:true,
      data:savedInfo
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      fullName: new RegExp(`^${req.params.fullName}$`, "i"),
    });
    console.log("user", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("user", user);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { submitForm, getUser };
