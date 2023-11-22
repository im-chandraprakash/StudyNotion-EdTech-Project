const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const mailSender = async (email, title, body) => {
    try {
        let transportor = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // port: 587,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS,
            },
        });
        console.log("mail is going to sent successfully");
        const info = await transportor.sendMail({
            from: "StudyNotion || by - Chandraprakash",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log("mail sent successfully", info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = mailSender;
