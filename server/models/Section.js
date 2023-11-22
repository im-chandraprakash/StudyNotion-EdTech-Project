const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
        trim: true,
    },
    subSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
            required: true,
        },
    ],
});


module.exports = mongoose.model("Section", sectionSchema);
