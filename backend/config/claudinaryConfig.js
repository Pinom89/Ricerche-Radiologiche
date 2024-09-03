import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import "dotenv/config";

// Configurazione dello storage Cloudinary



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_APY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY__API_SECRET,
});

// Configurazione dello storage Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: "centro-radiologico",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "pdf"],
}
});

// Creazione dell'uploader Multer con lo storage Cloudinary configurato
const cloudinaryUploader = multer({ storage: storage });

export default cloudinaryUploader;

