const router = require("express").Router();

const { getEnrolledCourses } = require("../controllers/Profile");

const {
    auth,
    isStudent,
    isInstructor,
    isAdmin,
} = require("../middlewares/auth");

const {
    createCategory,
    showAllCategories,
    categoryPageDetails,
} = require("../controllers/Category");

const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");

const {
    createSubSection,
    updateSubSection,
    deleteSubsection,
} = require("../controllers/SubSection");

const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    updateCourses,
    deleteCourse,
    getFullCourseDetails,
} = require("../controllers/Course");

const {
    createRating,
    getAverageRating,
    getAllRatings,
} = require("../controllers/RatingAndReview");

const { updateCourseProgress } = require("../controllers/CourseProgress");

//courses section
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, updateCourses);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.get("/getInstructorCourses", auth, isInstructor, getEnrolledCourses);
//section routers
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

//subSection routers

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection);

router.get("/getAllCourses", auth, getAllCourses);
router.get("/getCourseDetails", auth, getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatings);
module.exports = router;
