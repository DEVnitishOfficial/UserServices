import express from "express";
import userRouter from "./router/userInfoRouter.js";
import aadharRouter from "./router/aadharRouter.js"
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import connectToDB from "./config/dbConnection.js";
import cloudinary from "cloudinary";
dotenv.config();


const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const app = express();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname,'./client/dist')))

// app.use('*', (req,res) => {
//   res.sendFile(path.join(__dirname,'./client/dist/index.html'), function(error){
//     res.status(500).send('error from routing dnkn>>>>',error)
//   })
// })

const PORT = process.env.PORT || 8000;

cloudinary.v2.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
})

connectToDB.then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})
})


app.use("/api/user", userRouter);
app.use("/api/user/aadhar", aadharRouter);



app.use("*", (req, res) => {
  res.status(404).send("OPPS!! 404 page not found");
});

export default app;
