const mongoose = require("mongoose");

const SubSectionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    timeDuration: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
});

module.exports = mongoose.model("SubSection", SubSectionSchema);
