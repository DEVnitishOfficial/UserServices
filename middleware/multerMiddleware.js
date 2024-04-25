import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import path from "path";

import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


const s3 = new aws.S3();

const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // equivalent to 50 MB
  storage: multerS3({
    s3: s3,
    bucket:  "cyclic-relieved-plum-moose-ap-southeast-1",
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".mp4" &&
      ext !== ".png"
    ) {
      cb(new Error(`Unsupported file type ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
