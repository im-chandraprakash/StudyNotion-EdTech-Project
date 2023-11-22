const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/ImageUpload");
const { errors, success } = require("../utils/responseWrapper");

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description, timeDuration } = req.body;

        const video = req.files.video;

        if (!sectionId || !title || !description || !video) {
            return res.send(errors(404, "All Fields are required"));
        }

        const videoUrl = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );

        const newSubSection = await SubSection.create({
            title,
            description,
            timeDuration,
            videoUrl: videoUrl.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: newSubSection._id,
                },
            },
            {
                new: true,
            }
        )
            .populate("subSection")
            .exec();

        return res.send(
            success(200, {
                message: "Subsection is created Successfully",
                data: updatedSection,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body;

        const video = req?.files?.video;

        const subSection = await SubSection.findById(subSectionId);

        if (title) {
            subSection.title = title;
        }
        if (description) {
            subSection.description = description;
        }

        if (video) {
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );

            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = uploadDetails.duration;
        }

        await subSection.save();

        const sectionUpdatedData = await Section.findById(sectionId).populate(
            "subSection"
        );

        return res.send(
            success(200, {
                message: "Subsection is updated Successfully",
                data: sectionUpdatedData,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};

exports.deleteSubsection = async (req, res) => {
    try {
        const { sectionId, subSectionId } = req.body;

        console.log("hello" , sectionId , subSectionId);

        if (!sectionId || !subSectionId) {
            return res.send(errors(404, "subSectionId is required"));
        }

        const subSection = await SubSection.findByIdAndDelete({
            _id: subSectionId,
        });

        if (!subSection) {
            return res.send(errors(404, "Subsection not found"));
        }

        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        );

        // forget to delte the Subsection Id from Section

        return res.send(
            success(200, {
                message: "Subsection Deleted SuccessFully",
                data: updatedSection,
            })
        );
    } catch (e) {
        return res.send(errors(500, e.message));
    }
};
