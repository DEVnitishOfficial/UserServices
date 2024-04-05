import emailValidator from "email-validator";
import User from "../model/userInfoSchema.js";
import fs from "fs/promises";
import cloudinary from 'cloudinary'

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
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "public_info",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        console.log('result',result)
        const userInfo = await User.create({
          fullName,
          email,
          avatar: {
            public_id: result.public_id,
            secure_url:result.secure_url
          },
        });
        fs.rm(`uploads/${req.file.filename}`);

        console.log("userInfo", userInfo);
    
        const savedInfo = await userInfo.save();
        return res.status(200).json({
          success: true,
          data: savedInfo,
        });
      } catch (error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }

    
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
