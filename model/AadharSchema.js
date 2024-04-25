import { Schema,model } from "mongoose";


const AadharSchema = new Schema({
    hinName:{
        type:String,
        required: [true, "hindi name is Required"],
    },
    engName:{
        type:String,
        required: [true, "english name is Required"],
    },
    DOB:{
        type:String,
        required: [true, "DOB is Required"],
    },
    gender:{
        type:String,
        required: [true, "gender is Required"],
    },
    aadharNo:{
        type:String,
        required: [true, "aadharNo is Required"],
    },
    address:{
        type:String,
        required: [true, "address is Required"],
    },
    hinAddress:{
        type:String,
        required: [true, "hindi address is Required"],
    },
    aadharIssueDate:{
        type:String,
        required: [true, "aadhar issue date is Required"],
    },
    QRCode:{
        public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          }, 
    },
    avatar: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },
    
},
{
    timestamps:true
})

const Aadhar = model('Aadhar',AadharSchema)
export default Aadhar