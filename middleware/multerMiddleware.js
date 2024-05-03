import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  limits: { fileSize: 50 * 1024 * 1024 }, // equivalent to 50 MB
  storage: multerS3({
    s3: s3,
    bucket: "cyclic-relieved-plum-moose-ap-southeast-1",
    contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the content type
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
    acl: "public-read", // Set ACL (Access Control List) for uploaded files
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
