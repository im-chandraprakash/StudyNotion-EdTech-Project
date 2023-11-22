const { default: mongoose, mongo } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { errors, success } = require("../utils/responseWrapper");
const mailSender = require("../utils/mailSender");
const PaymentSuccessEmail = require("../mail/templates/paymentSuccessEmail");
const {
    courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollementEmail");

const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.send(errors(404, "Please provide Course Id"));
    }

    let totalAmount = 0;

    for (const courseId of courses) {
        let course;

        try {
            course = await Course.findById(courseId);

            if (!course) {
                return res.send(errors(500, "Could not find the courses"));
            }
            let uid = new mongoose.Schema.Types.ObjectId(userId);
            if (course?.studentEnrolled.includes(uid)) {
                return res.send(errors(500, "Student is already Enrolled"));
            }
            totalAmount += course?.price;
        } catch (error) {
            return res.send(errors(500, error));
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    };

    try {
        const orderResponse = await instance.orders.create(options);
        return res.send(success(200, orderResponse));
    } catch (error) {
        return res.send(errors(500, error.message));
    }
};

exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id } = req.body;
    const { razorpay_payment_id } = req.body;
    const { razorpay_signature } = req.body;
    const { courses } = req.body;
    const userId = req.user._id;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.send(errors(404, "verify payment All field required"));
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        // enroll krwa do student ko
        await enrolledStudent(courses, userId, res);

        return res.send(success(200, "Payment Varified"));
    }

    return res.send(errors(500, "Payment Failed"));
};

const enrolledStudent = async (courses, userId, res) => {
    if (!courses || !userId || !res) {
        return res.send(
            errors(404, "Please provide data for Courses or UserId")
        );
    }
    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findByIdAndUpdate(
                { _id: courseId },
                {
                    $push: { studentEnrolled: userId },
                },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.send(errors(404, "Course Not found"));
            }

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            });

            const enrolledStudent = await User.findByIdAndUpdate(
                { _id: userId },
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );

            if (!enrolledStudent) {
                return res.send(errors(404, "User not found"));
            }

            // bache ko email send krdo

            const emailResponse = await mailSender(
                enrolledStudent?.email,
                `Successfully Enrolled into ${enrolledCourse?.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse?.courseName,
                    enrolledStudent?.firstName
                )
            );

            // console.log("Email sent Successfully : ", emailResponse);
        } catch (error) {
            return res.send(errors(500, error.message));
        }
    }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;
    if (!orderId || !paymentId | !amount || userId) {
        return res.send(errors(400, "Please Provide All fields"));
    }

    try {
        const enrolledStudent = await User.findById(userId);

        const response = await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            PaymentSuccessEmail(
                enrolledStudent.firstName,
                amount / 100,
                orderId,
                paymentId
            )
        );
    } catch (error) {
        return res.send(errors(500, "Could not send Email"));
    }
};

// exports.capturePayment = async (req, res) => {
//     try {
//         const { courseId } = req.body;
//         const user_id = req.user._id;

//         if (!courseId) {
//             return res.send(errors(404, "course Id is required"));
//         }
//         const courseDetails = await Course.findById(courseId);

//         if (!courseDetails) {
//             return res.send(errors(404, "Invalid course Id"));
//         }

//         const userObjectId = mongoose.Schema.Types.ObjectId(user_id);

//         if (courseDetails.studentEnrolled.includes(userObjectId)) {
//             return res.send(
//                 errors(400, "Student is already registered in this Course")
//             );
//         }

//         const amount = courseDetails.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString,
//             notes: {
//                 user_id,
//                 course_id: courseId,
//             },
//         };

//         const paymentResponse = instance.orders.create(options);

//         console.log("payment Response :", paymentResponse);

//         return res.send(
//             success(200, {
//                 message: "Payment Successfull",
//                 courseName: courseDetails.courseName,
//                 description: courseDetails.description,
//                 thumbnail: courseDetails.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount,
//             })
//         );
//     } catch (e) {
//         return res.send(errors(500, e.message));
//     }
// };

// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("payment is Authorized");

//         const { courseId, userId } = req.body.payload.payment.entity.notes;

//         try {
//             //fulfill the action

//             //find the course and enroll studen in it

//             const enrolledCourse = await Course.findByIdAndUpdate(
//                 { _id: courseId },
//                 {
//                     $push: {
//                         studentEnrolled: userId,
//                     },
//                 },
//                 {
//                     new: true,
//                 }
//             );

//             if (!enrolledCourse) {
//                 return res.send(errors(500, "Course not Found"));
//             }

//             console.log(enrolledCourse);

//             //find the student and store entry of Course

//             const enrolledStudent = await User.findByIdAndUpdate(
//                 { _id: userId },
//                 {
//                     $push: {
//                         courses: courseId,
//                     },
//                 },
//                 {
//                     new: true,
//                 }
//             );

//             // mail send kro confirmation wala

//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulations from StudyNotion",
//                 "Congratulations, you are onboarded into new StudyNotion Course"
//             );

//             console.log("emailResponse : ", emailResponse);

//             return res.send(success("Signature Verified and Course Added"));
//         } catch (e) {
//             return res.send(errors(500, e.message));
//         }
//     } else {
//         return res.send(errors(500, "Signature is not verified"));
//     }
// };
