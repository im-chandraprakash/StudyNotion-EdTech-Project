const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            secure:true,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });
    } catch (e) {
        console.log(e);
    }
};
