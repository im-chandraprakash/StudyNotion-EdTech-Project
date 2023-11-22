const { errors, success } = require("../utils/responseWrapper");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subSectionId } = req.body;
        const userId = req.user._id;

        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.send(errors(400, "Invalid Subsection"));
        }

        const courseProgress = await CourseProgress.findOne({
            userId,
            courseId,
        });

        if (!courseProgress) {
            return res.send(errors(400, "Couse Progress does not exists"));
        } else {
            // check for re-confirmation

            if (courseProgress.completedVideos.includes(subSectionId)) {
                return res.send(errors(403, "Subsection already Completed"));
            } else {
                courseProgress.completedVideos.push(subSectionId);
            }

            await courseProgress.save();
        }

        return res.send(success(200, "Successfull Completed"));
    } catch (error) {
        return res.send(errors(500, error.message));
    }
};
