import React from "react";
import { COURSE_STATUS } from "../../../../utils/constants";

import { BiSolidCheckCircle, BiSolidTimeFive } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import ConfirmationModel from "../../../common/ConfirmationModel";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
    deleteCourseAPI,
    getInstructorCourseAPI,
} from "../../../../services/operations/courseDetailAPI";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";

function CourseTable({ course, customClasses, setCourseData }) {
    const [delteCourseModel, setDeleteCourseModel] = useState(null);
    const [dateAndTime, setDateAndTime] = useState();
    const { token } = useSelector((state) => state.auth);
    const TRUNCATE_LENGTH = 30;
    const navigate = useNavigate();

    const handleDeleteCourse = async (course) => {
        await deleteCourseAPI(token, { courseId: course?._id });

        const result = await getInstructorCourseAPI(token);

        if (result) {
            setCourseData(result);
            setDeleteCourseModel(null);
        }
    };

    const DateAndTime = () => {
        const dAndT = formatDate(course?.createdAt);

        if (dAndT) {
            setDateAndTime(dAndT);
        }
    };

    useState(() => {
        DateAndTime();
    }, []);
    return (
        <div
            className={`flex justify-between text-richblack-25 px-7 py-8 border-[1px] border-richblack-700 ${customClasses}`}
        >
            <div className="flex gap-5 flex-col lg:flex-row ">
                <div className="w-[225px] h-[160px]">
                    <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="w-[100%] h-[100%] rounded-lg object-cover"
                    />
                </div>

                <div className="flex flex-col gap-3 text-lg">
                    <h1 className="text-lg font-bold">{course?.courseName}</h1>
                    <h1 className="text-richblack-200 text-[12px]">
                        {course.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                            ? course.courseDescription
                                  .split(" ")
                                  .slice(0, TRUNCATE_LENGTH)
                                  .join(" ") + "..."
                            : course.courseDescription}
                    </h1>
                    <p className="text-sm">createdAt {" " + dateAndTime}</p>

                    {course?.status === COURSE_STATUS.DRAFT ? (
                        <div className="flex items-center gap-2 bg-pink-900 text-pink-400 w-fit px-2  rounded-xl text-[11px] font-bold tracking-[0.5px]">
                            <BiSolidTimeFive />
                            <span>Drafted</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-richblack-700 text-yellow-50 w-fit px-2  rounded-xl text-[13px] font-bold tracking-[0.5px]">
                            <BiSolidCheckCircle />
                            <span>Published</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex">
                <div className=" h-[30px] flex flex-col md:flex-row justify-between items-center gap-8  lg:gap-14  text-[14px] text-richblack-100">
                    <h1>2hr 30min</h1>
                    <h1>₹ {course?.price}</h1>
                    <div className="flex flex-col lg:flex-row gap-4 sm:mt-10 lg:mt-0 text-2xl">
                        <button
                            onClick={() => {
                                navigate(
                                    `/dashboard/edit-course/${course?._id}`
                                );
                            }}
                        >
                            <MdModeEdit />
                        </button>
                        <button
                            onClick={() =>
                                setDeleteCourseModel({
                                    text1: "Do you want to delete this course?",
                                    text2: "All the data related to this course will be deleted",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: () => {
                                        handleDeleteCourse(course);
                                    },
                                    btn2Handler: () => {
                                        setDeleteCourseModel(null);
                                    },
                                })
                            }
                        >
                            <RiDeleteBinLine />
                        </button>
                    </div>
                </div>
            </div>
            {delteCourseModel && (
                <ConfirmationModel modalData={delteCourseModel} />
            )}
        </div>
    );
}

export default CourseTable;
