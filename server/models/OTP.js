const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const userVerificationTemplate = require("../mail/templates/userVerificationTemplate");

const OTPschema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    },
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Varification email from StudyNotion",
            userVerificationTemplate(otp)
        );
        console.log("mail Send successfully", mailResponse);
    } catch (error) {
        console.log("error occured during sending mail", error);
        throw error;
    }
}

OTPschema.pre("save", async function (next) {
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model("OTP", OTPschema);
