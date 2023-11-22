const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { errors, success } = require("../utils/responseWrapper");
const { uploadImageToCloudinary } = require("../utils/ImageUpload");
const { populate } = require("dotenv");

exports.updateProfile = async (req, res) => {
    try {
        const {
            dateOfBirth = "",
            about = "",
            gender,
            contactNumber,
        } = req.body;

        const id = req.user._id;

        if (!gender || !contactNumber || !id) {
            return res.send(errors(404, "All Fields are required"));
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        const updatedUser = await User.findById(id).populate(
            "additionalDetails"
        );

        return res.send(
            success(200, {
                message: "Profile Updated SuccessFully",
                data: updatedUser,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        // TODO: Find More on Job Schedule
        // const job = schedule.scheduleJob("10 * * * * *", function () {
        // 	console.log("The answer to life, the universe, and everything!");
        // });
        // console.log(job);
        console.log("userId which is going to delete ");
        const userId = req.user._id;

        const user = await User.findById(userId);

        console.log("user which is going to delete ", user);
        if (!user) {
            return res.send(errors(404, "User not found"));
        }
        const profileId = user.additionalDetails;

        await Profile.findByIdAndDelete(profileId);
        // await Profile.findByIdAndDelete({ _id: user.userDetails });
        await User.findByIdAndDelete(userId);

        return res.send(success(200, "user Deleted SuccessFully"));
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const id = req.user._id;

        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        if (!userDetails) {
            return res.send(errors(404, "User is not found"));
        }

        return res.send(
            success(200, {
                message: "user detail fetched Successfully",
                data: userDetails,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("request file", req.files);
        const displayPicture = req.files.displayPicture;
        const userId = req.user._id;

        if (!displayPicture) {
            return res.send(errors(404, "Display image is required"));
        }
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const updatedProfile = await User.findByIdAndUpdate(
            {
                _id: userId,
            },
            {
                image: image.secure_url,
            },
            {
                new: true,
            }
        )
            .populate("additionalDetails")
            .exec();

        return res.send(
            success(200, {
                messsage: "Image Updated successfully",
                data: updatedProfile,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user._id;

        const enrolledCourses = await User.findById(userId)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                },
            })
            .exec();

        if (!enrolledCourses) {
            return res.send(errors(404, "user not found"));
        }

        return res.send(success(200, enrolledCourses));
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.instructorDashboard = async (req, res) => {
    try {
        const id = req.user._id;

        const courseDetails = await Course.find({ instructor: id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = course.price * totalStudentsEnrolled;

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            };

            return courseDataWithStats;
        });

        return res.send(success(200, courseData));
    } catch (error) {
        return res.send(errors(500, error.message));
    }
};
