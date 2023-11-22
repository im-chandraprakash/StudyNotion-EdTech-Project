import React from "react";
import { useEffect } from "react";
import { apiConnector } from "../../../../services/apiConnector";
import { profileEndpoints } from "../../../../services/apis";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getInstructorDataAPI } from "../../../../services/operations/ProfileAPI";
import { getInstructorCourseAPI } from "../../../../services/operations/courseDetailAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

function InstructorDashboard() {
    const { token } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.profile);

    const [instructorData, setInstructorData] = useState(null);
    const [instructorCourses, setInstructorCourses] = useState(null);

    const fetchInstructorData = async () => {
        setLoading(true);
        const result = await getInstructorDataAPI(token);
        const couses = await getInstructorCourseAPI(token);

        setLoading(false);

        if (result) {
            setInstructorData(result);
        }

        console.log("instuctor data  ", couses);

        if (couses) {
            setInstructorCourses(couses);
        }
    };

    const totalAmount = instructorData?.reduce(
        (arr, curr) => arr + curr.totalAmountGenerated,
        0
    );
    const totalStudent = instructorData?.reduce(
        (arr, cur) => arr + cur.totalStudentsEnrolled,
        0
    );

    console.log(totalAmount, totalStudent);

    useEffect(() => {
        fetchInstructorData();
    }, []);
    return (
        <div className="text-white w-full max-w-maxContent mx-auto">
            {loading ? (
                <div> Loading ...</div>
            ) : (
                <div>
                    <div>
                        <h1 className="font-bold text-2xl">
                            Hii {user?.firstName + " " + user?.lastName}{" "}
                            <span className="text-2xl">👋</span>
                        </h1>
                        <p className="font-bold text-[1] text-richblack-300">
                            Let's start something new
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 mt-5">
                        <div className=" w-full lg:w-[70%] bg-richblack-800 p-6">
                            {totalAmount > 0 || totalStudent > 0 ? (
                                <InstructorChart courses={instructorData} />
                            ) : (
                                <div className="flex-1 rounded-md bg-richblack-800 p-6">
                                    <p className="text-lg font-bold text-richblack-5">
                                        Visualize
                                    </p>
                                    <p className="mt-4 text-xl font-medium text-richblack-50">
                                        Not Enough Data To Visualize
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex w-full lg:w-[30%] flex-col rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">
                                Statistics
                            </p>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <p className="text-lg text-richblack-200">
                                        Total Courses
                                    </p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        {instructorData?.length}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">
                                        Total Students
                                    </p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        {totalStudent}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">
                                        Total Income
                                    </p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        Rs. {totalAmount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-richblack-800 mt-6 rounded-lg">
                        <div className="flex items-center justify-between mx-10 pt-5 text-2xl">
                            <p className="text-lg font-bold text-richblack-5">
                                Your Courses
                            </p>
                            <Link to="/dashboard/my-courses">
                                <p className="text-sm font-semibold text-yellow-50">
                                    View All
                                </p>
                            </Link>
                        </div>
                        <div className="my-4 flex flex-col lg:flex-row items-start justify-center gap-6  space-6 p-9 pt-2 ">
                            {instructorCourses?.slice(0, 3).map((course) => (
                                <div key={course._id} className="w-full lg:w-1/3">
                                    {console.log("image : ", course)}
                                    <img
                                        src={course?.thumbnail}
                                        alt={course.courseName}
                                        className="h-[201px] w-full rounded-md object-cover"
                                    />
                                    <div className="mt-3 w-full">
                                        <p className="text-sm font-medium text-richblack-50">
                                            {course.courseName}
                                        </p>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <p className="text-xs font-medium text-richblack-300">
                                                {
                                                    course?.studentEnrolled
                                                        ?.length
                                                }{" "}
                                                students
                                            </p>
                                            <p className="text-xs font-medium text-richblack-300">
                                                |
                                            </p>
                                            <p className="text-xs font-medium text-richblack-300">
                                                Rs. {course.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InstructorDashboard;
