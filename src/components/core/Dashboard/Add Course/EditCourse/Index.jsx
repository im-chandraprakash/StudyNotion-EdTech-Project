import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../RenderSteps";
import { getFullCourseDetailsAPI } from "../../../../../services/operations/courseDetailAPI";
import { setCourse, setEditCourse } from "../../../../../slices/courseSlice";

function EditCourse() {
    const { courseId } = useParams();
    const dispatch = useDispatch();

    let data = {
        courseId: courseId,
    };

    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    const fetchFullCourseDetails = async () => {
        const result = await getFullCourseDetailsAPI(token, data);
        console.log("edit result", result);

        if (result) {
            dispatch(setCourse(result));
            dispatch(setEditCourse(true));
        }
    };

    useEffect(() => {
        fetchFullCourseDetails();
    }, []);
    return (
        <div className="flex  flex-col gap-5">
            <h1 className="text-3xl text-richblack-25 font-bold">
                Edit Course
            </h1>

            <div className="flex justify-center items-center mt-6">
                <div className="w-[60%]">
                    {course ? <RenderSteps /> : "Course Not Found"}
                </div>
            </div>
        </div>
    );
}

export default EditCourse;
