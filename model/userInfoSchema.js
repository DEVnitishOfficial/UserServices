import { Schema, model } from "mongoose";

const userInfoSchema = new Schema({

    fullName: {
        type: String,
        unique:true,
        required: [true, "user name is Required"],
        custom_minLength: [5, "Name must be at least 5 characters"],
        custom_maxLength: [50, "Name must be less than 50 characters"],
        trim: true,
        lowercase: true,
      },
      email: {
        type: String,
        match: [
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "please entre a valid email address(db)",
        ],
      },
      dateOfBirth:{
        type: String,
        lowercase : true
      },
      fatherName:{
        type: String,
        lowercase : true
      },
      motherName:{
        type: String,
        lowercase : true
      },
      mobileNo:{
        type: String,
        lowercase : true
      },
      whatsAppNumber:{
        type: String,
        lowercase : true
      },
      panNo:{
        type: String,
        lowercase : true
      },
      aadharNo:{
        type: String,
        lowercase : true
      },
      caste:{
        type: String,
        lowercase : true
      },
      address:{
        type: String,
        lowercase : true
      },
      avatar: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },

},{timestamps:true})

const User = model('User',userInfoSchema)
export default User