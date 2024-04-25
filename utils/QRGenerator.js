import QRCode from "qrcode";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QRGenerator = async (data) => {
  let formattedData = `Name: ${data.name},\nAddress: ${data.address},\nDescription: ${data.description}`;

  let timestamp = new Date().getTime();
  let fileName = `qr_${timestamp}.png`;
  let filePath = path.join(__dirname, "../uploads", fileName); // __dirname says, from the current directory go inside the uploads and name the file with 'fileName'

  try {
    await QRCode.toFile(filePath, formattedData); // Wait for QRCode generation
    console.log("QR code saved to", filePath);
    return filePath;
  } catch (err) {
    console.error("Error generating QR code:", err);
    throw err;
  }
};

export default QRGenerator;
