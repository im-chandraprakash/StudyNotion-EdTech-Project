const RatingAndReview = require("../models/RatingAndReviews");
const User = require("../models/User");
const Course = require("../models/Course");

const { success, errors } = require("../utils/responseWrapper");

exports.createRating = async (req, res) => {
    try {
        const { rating, reviews, courseId } = req.body;

        const userId = req.user._id;

        console.log("req body", req.body);

        const courseDetail = await Course.findById(courseId);

        if (!rating || !reviews || !courseDetail || !userId) {
            return res.send(errors(404, "All fields are required"));
        }

        // const enrolled = await Course.find({
        //     courseId,
        //     studentEnrolled: {
        //         $elemMatch: {
        //             $eq: userId,
        //         },
        //     },
        // });

        // if (!enrolled) {
        //     return res.send(errors(400, "User is not Enrolled in this course"));
        // }

        // const alreadyReviewed = await RatingAndReview.findOne({
        //     user: userId,
        //     course: courseId,
        // });

        // if (alreadyReviewed) {
        //     return res.send(errors(400, "User has Already reviewed by User"));
        // }

        const ratingReview = await RatingAndReview.create({
            user: userId,
            rating,
            reviews,
            course: courseId,
        });

        const updatedCourseReview = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                },
            },
            {
                new: true,
            }
        );

        return res.send(
            success(200, {
                message: "Review created successfully",
                data: updatedCourseReview,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.boyd.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: courseId,
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        if (result.length > 0) {
            return res.send(success(200, result[0].averageRating));
        }

        return res.send(
            success(200, {
                message: "Average Rating is 0, no ratings given till now",
                averageRating: 0,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.getAllRatings = async (req, res) => {
    try {
        const getAllRatings = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            })
            .exec();

        return res.send(
            success(200, {
                message: "All reviews fetched Sucessfully",
                data: getAllRatings,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};
