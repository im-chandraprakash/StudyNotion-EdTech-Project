const mongoose = require("mongoose");

const ratingAndreviews = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviews: {
        type: String,
        required: true,
        trim: true,
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required : true,
        index : true,
    }
});

module.exports = mongoose.model("RatingAndReviews", ratingAndreviews);
