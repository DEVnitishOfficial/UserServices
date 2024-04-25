import mongoose from "mongoose";

mongoose.set("strictQuery", false); // disabling strict features of mongoose

// database connection
const connectToDB = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.MONGO_URL);
  
    if(connection){
      console.log(`Connected to MongodDB at : ${connection.host}`)
    }
  } catch (error) {
    console.log('db connection error',error)
    process.exit(1)
  }

};

export default connectToDB;
