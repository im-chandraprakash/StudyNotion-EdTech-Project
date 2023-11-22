import React from "react";
import IconBtn from "../../common/IconBtn";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { getInstructorCourseAPI } from "../../../services/operations/courseDetailAPI";
import { useSelector } from "react-redux";
import CourseTable from "./InstructorCourses/CourseTable";
import { useNavigate } from "react-router-dom";


function MyCourse() {
    const [courseData, setCourseData] = useState([]);
    const { token } = useSelector((state) => state.auth);
    

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await getInstructorCourseAPI(token);
            setLoading(false);

            console.log("my courses result : ", result);
            if (result) {
                setCourseData(result);
            }
        } catch (error) {
            console.log("course data failed", error);
        }
    };

   

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="flex justify-between text-white">
                <h1 className=" text-3xl font-semibold">My Courses</h1>
                <IconBtn
                    text={"Add Course"}
                    customClasses={"flex items-center gap-3"}
                    onclick={() => navigate("/dashboard/add-course")}
                >
                    <AiOutlinePlus />
                </IconBtn>
            </div>

            <div className=" text-richblack-25">
                <div className="mt-10">
                    <div className="flex justify-between border-[1px] border-richblack-700 border-b-0 px-5  py-2 text-lg font-bold text-richblack-400">
                        <div>
                            <h1>Courses</h1>
                        </div>
                        <div className="flex justify-between gap-6 mg:gap-8 lg:gap-16">
                            <h1>Duration</h1>
                            <h1>Price</h1>
                            <h1>Action</h1>
                        </div>
                       
                    </div>

                    {loading || courseData.length == 0 ? (
                        <div className=" flex justify-center items-center p-16 text-richblack-300 text-2xl font-bold border-[1px] border-richblack-700">
                            <h1>No Courses Found</h1>
                        </div>
                    ) : (
                        <div>
                            {courseData?.map((course, index) => (
                                <CourseTable
                                    course={course}
                                    setCourseData={setCourseData}
                                    key={course?._id}
                                    customClasses={
                                        courseData.length === index + 1
                                            ? ""
                                            : "border-b-0"
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MyCourse;
