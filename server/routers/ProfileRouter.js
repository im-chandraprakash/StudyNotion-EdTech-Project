const express = require("express");
const router = express.Router();
const { auth, isStudent, isInstructor } = require("../middlewares/auth");
const {
    deleteProfile,
    updateProfile,
    getUserDetails,
    getEnrolledCourses,
    updateDisplayPicture,
    instructorDashboard,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getInstructorData", auth, isInstructor , instructorDashboard);

module.exports = router;
