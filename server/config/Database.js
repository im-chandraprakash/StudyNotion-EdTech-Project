const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGODB_URL;

exports.connect = async () => {
    await mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Database Connected Succesfully");
        })
        .catch((error) => {
            console.log("Database Connection failed");
            console.error(error);
            process.exit(1);
        });
};
