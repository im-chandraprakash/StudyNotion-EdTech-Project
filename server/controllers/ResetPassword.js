const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { errors, success } = require("../utils/responseWrapper");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send(401, "Your Email is not connected with us");
        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate(
            { email },
            { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
            {
                new: true,
            }
        );

        const url = `http://localhost:3000/reset-password/${token}`;

        await mailSender(
            email,
            "Reset Password link",
            `Reset Password Link ${url}`
        );

        return res.send(
            success(200, {
                message: "Reset Password url send Successfully",
                data: updatedDetails,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (!password || !confirmPassword || !token) {
            return res.send(errors(404, "All fields are required"));
        }

        if (password !== confirmPassword) {
            return res.send(errors(401, "Password is not matching"));
        }

        const userDetails = await User.findOne({ token });

        if (!userDetails) {
            return res.send(errors(401, "Invalid Token"));
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.send(errors(401, "token has been expired"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            { token },
            { password: hashedPassword },
            { new: true }
        );

        return res.send(
            success(200, {
                message: "Password has been reset SuccessFullly ",
                data: user,
                password,
            })
        );
    } catch (e) {
        return res.send(errors(500, "Error occur while reseting Password"));
    }
};

module.exports = {
    resetPasswordToken,
    resetPassword,
};
