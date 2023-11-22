const User = require("../models/User.js");
const OTP = require("../models/OTP.js");
const Profile = require("../models/Profile.js");
const generateOTP = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errors, success } = require("../utils/responseWrapper.js");

// otp generate

const otpGenerateController = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUser = await User.findOne({ email });

        if (checkUser) {
            return res.send(errors(401, "User Already Registered"));
        }

        const otp = generateOTP.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const result = await OTP.findOne({ otp });
        // console.log("otp is " , result)

        while (result) {
            otp = generateOTP.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({ otp });
        }

        const otpPayload = { email, otp };

        const otpBody = await OTP.create(otpPayload);

        return res.send(success(200, otpBody));
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

// user sign up

const signUpController = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.send(errors(403, "All Fields are required"));
        }

        if (password !== confirmPassword) {
            return res.send(
                errors(
                    400,
                    "password and confirmPassword value does not match , please try again"
                )
            );
        }

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.send(errors(400, "User is already registered"));
        }

        // find most recent otp

        const recentOTP = await OTP.findOne({ email })
            .sort({ createdAt: -1 })
            .limit(1);

        // validate otp

        // console.log();
        console.log("recent Otp", recentOTP, "otp", otp);

        if (!recentOTP || recentOTP.length == 0) {
            return res.send(errors(400, "OTP not Found"));
        } else if (recentOTP.otp !== otp) {
            return res.send(errors(400, "OTP is not valid"));
        }

        // Hash Password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Null Entry in Profile
        console.log("password is hasshed ", hashedPassword);
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber || null,
        });

        // Create Entry in DB

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg/seed=${firstName} ${lastName}`,
        });

        return res.send(
            success(200, { message: "user registered successfully", user })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send(errors(400, "All Fields are required"));
        }

        const user = await User.findOne({ email })
            .populate("additionalDetails")
            .exec();

        if (!user) {
            return res.send(errors(500, "email does not exits"));
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                _id: user._id,
                accountType: user.accountType,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "10h",
            });

            user.token = token;
            user.password = undefined;

            // console.log("after modifying user" , user);

            const options = {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //after 3 days cookie will expire
            };

            res.cookie("token", token, options);

            return res.send(
                success(200, {
                    message: "User logged in successfully",
                    user,
                })
            );
        } else {
            return res.send(errors(500, "Incorrect Password"));
        }
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};
// change password

const changePassword = async (req, res) => {
    try {
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        const id = req.user._id;
        // if(bcrypt.compare(currentPassword , ))
        const user = await User.findById(id);
        // console.log("user", user);

        if (!(await bcrypt.compare(currentPassword, user?.password))) {
            return res.send(errors(401, "Invalid password"));
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        user.save();

        res.send(
            success(200, {
                message: "password changed successfully",
            })
        );
    } catch (e) {
        res.send(errors(400, e.message));
    }
};

module.exports = {
    otpGenerateController,
    signUpController,
    loginController,
    changePassword,
};
