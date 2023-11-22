const Section = require("../models/Section");
const Course = require("../models/Course");
const { errors, success } = require("../utils/responseWrapper");

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        // console.log("boyd" , req.body);

        if (!sectionName || !courseId) {
            return res.send(errors(404, "All section fields are required"));
        }

        const section = await Section.create({
            sectionName: sectionName,
        });

        const updatedCourse = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: {
                    courseContent: section._id,
                },
            },
            {
                new: true,
            }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.send(
            success(200, {
                message: "Section created Successfully",
                updatedCourse,
            })
        );
    } catch (e) {
        return res.send(
            errors(500, {
                message: "Unable to create Section",
                error: e.message,
            })
        );
    }
};

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId, courseId } = req.body;

        if (!sectionId || !sectionName || !courseId) {
            return res.send(errors(404, "All section fields are required"));
        }

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                sectionName: sectionName,
            },
            {
                new: true,
            }
        );

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.send(
            success(200, {
                message: "Section updated SuccessFully",
                data: courseDetails,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!sectionId || !courseId) {
            return res.send(errors(404, "All Field  is required"));
        }

        await Section.findByIdAndDelete(sectionId);

        // forget to delete from Course Content Section

        const courseDetails = await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            },
        })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.send(
            success(200, {
                message: "course deleted Succefully",
                data: courseDetails,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};
