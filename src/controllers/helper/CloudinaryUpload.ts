const path = require('path');
const fs = require('fs').promises;  
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image:String) => {
  try {
    const parentDir = path.resolve(__dirname, '../../../public');
    const imagePath = path.join(parentDir, image);

    // Membaca file gambar
    const data = await fs.readFile(imagePath);

    // Mengunggah gambar ke Cloudinary
    const result = await cloudinary.uploader.upload(imagePath);

    return result.secure_url
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};


