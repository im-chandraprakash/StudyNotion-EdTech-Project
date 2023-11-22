const User = require("../models/User");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Category = require("../models/Category");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const { errors, success } = require("../utils/responseWrapper");
const { uploadImageToCloudinary } = require("../utils/ImageUpload");
const { populate } = require("dotenv");

exports.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        const thumbnail = req.files.thumbnailImage;
        console.log("course : ", req.body, thumbnail);

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !category ||
            !thumbnail ||
            !status ||
            !instructions
        ) {
            return res.send(errors(404, "All fields are required"));
        }
        //confusion between user._id and instructor._id
        const instructionList = instructions.split(",");

        // console.log("list", instructionList);
        const arrayTag = tag.split(",");
        const instructorId = req.user._id;
        const instructorDetails = await User.findById(instructorId);

        if (!instructorDetails) {
            return res.send(errors(404, "Instructor Not Found"));
        }

        const categoryDetails = await Category.findById({ _id: category });

        if (!categoryDetails) {
            return res.send(errors(404, "Category Details not found"));
        }

        const thumbnailUrl = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail: thumbnailUrl.secure_url,
            tag: arrayTag,
            category: categoryDetails._id,
            instructions: instructionList,
            status,
        });

        await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id,
            },
            {
                $push: { courses: newCourse._id },
            },
            {
                new: true,
            }
        );

        await Category.findByIdAndUpdate(
            {
                _id: category,
            },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            {
                new: true,
            }
        );

        return res.send(
            success(200, {
                message: "Course Created Successfully",
                data: newCourse,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.updateCourses = async (req, res) => {
    try {
        const {
            courseId,
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        console.log("category", category);

        const thumbnail = req?.files?.thumbnail;

        const courseDetails = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        });

        if (thumbnail) {
            let thumnailData = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );
            courseDetails.thumbnail = thumnailData.secure_url;
        }

        if (courseName) {
            courseDetails.courseName = courseName;
        }

        if (courseDescription) {
            courseDetails.courseDescription = courseDescription;
        }

        if (whatYouWillLearn) {
            courseDetails.whatYouWillLearn = whatYouWillLearn;
        }

        if (price) {
            courseDetails.price = price;
        }
        if (tag) {
            const newTag = tag.split(",");
            courseDetails.tag = newTag;
        }
        if (category) {
            courseDetails.category = category;
        }

        if (instructions) {
            const instructionList = instructions.split(",");
            courseDetails.instructions = instructionList;
        }
        if (status) {
            courseDetails.status = status;
        }

        await courseDetails.save();

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.send(success(200, { courseDetails: updatedCourse }));
    } catch (error) {
        return res.send(errors(500, error.message));
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const allCoursesDetails = await Course.find(
            {},
            {
                courseName: true,
                courseDescription: true,
                price: true,
                instructor: true,
                ratingAndReviews: true,
                studentEnrolled: true,
            }
        )
            .populate("instructor")
            .exec();

        return res.send(
            success(200, {
                message: "Data for all Courses fetched SuccessFully",
                data: allCoursesDetails,
            })
        );
    } catch (e) {
        return res.send(
            errors(500, ("Failed while fetching all the courses", e.message))
        );
    }
};

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;

        if (!courseId) {
            return res.send(errors(404, "Course Id not found"));
        }

        const courseDetails = await Course.find({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        console.log("Course details ", courseDetails);

        if (!courseDetails) {
            return res.send(
                errors(404, `Could not find Course with  courseId ${courseId}`)
            );
        }

        return res.send(
            success(200, {
                message: "Course fetched Successfully",
                data: courseDetails,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user._id;

        if (!courseId) {
            return res.send(errors(404, "Course Id not found"));
        }
        const courseDetails = await Course.findOne({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        const courseProgressCount = await CourseProgress.findOne({
            courseId,
            userId,
        });
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            });
        }

        // let courseProgressCount = await CourseProgress.findOne(courseId).exec();

        return res.send(
            success(200, {
                data: courseDetails,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount.completedVideos
                    : [],
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        console.log("course detail : ", courseId, course);

        if (!course) {
            return res.send(errors(404, "Course Not Found"));
        }
        // Unenroll students from the course

        const enrolledStudents = course.courseContent;
        for (const studentId of enrolledStudents) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            });
        }

        // Delete sections and sub-sections

        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId);

            if (section) {
                const subSections = section.subSection;
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }

            await Section.findByIdAndDelete(sectionId);
        }
        // delete course

        await Course.findByIdAndDelete(courseId);

        return res.send(success(200, "Course Deleted Successfully"));
    } catch (error) {
        return res.send(errors(500, error.message));
    }
};
