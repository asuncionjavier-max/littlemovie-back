import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import "dotenv/config";


cloudinary.config({
    cloud_name: process.env.API_CLOUD_NAME,
    api_key: process.env.API_CLOUDINARY_KEY,
    api_secret: process.env.API_CLOUDINARY_KEY_SECRET

});

const storage = multer.memoryStorage();
export const upload = multer({storage});

export default cloudinary;