import React from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { GrFormNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetailsAPI } from "../../../../../services/operations/courseDetailAPI";
import { useEffect } from "react";

function PublishCourse() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    const { course , editCourse } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (editCourse) {
            if (course?.status === COURSE_STATUS.PUBLISHED) {
                setValue("publish", true);
            }
        }
    }, []);

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    };

    const goToBack = () => {
        dispatch(setStep(2));
    };

    const handlePublishCourse = async (data) => {
        if (
            (course?.status === COURSE_STATUS.PUBLISHED &&
                getValues("publish") === true) ||
            (course?.status === COURSE_STATUS.DRAFT &&
                getValues("publish") === false)
        ) {
            // form has not been updated
            // no need to make api call
            goToCourses();
            return;
        }

        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("publish")
            ? COURSE_STATUS.PUBLISHED
            : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        const result = await editCourseDetailsAPI(token, formData);

        if (result) {
            goToCourses();
        }
    };

    function onSubmit(data) {
        console.log("submitted data  :", data);
        handlePublishCourse(data);
    }
    return (
        <div className="text-white bg-richblack-800 border-[1px] border-richblack-600 rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-2xl font-bold">Publish Settings</h1>
                <div className="text-xl text-richblack-300 flex items-center gap-3 text-[18px] mt-5 ">
                    <label
                        htmlFor="publish"
                        className="inline-flex items-center text-lg"
                    >
                        <input
                            id="publish"
                            type="checkbox"
                            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                            {...register("publish")}
                        />
                        <span className="ml-2 text-richblack-400">
                            Mark this course as public
                        </span>
                    </label>
                </div>

                <div className="flex gap-4 justify-end mt-10">
                    <button
                        className="px-5 py-2 bg-richblack-300 text-black semibold rounded-lg"
                        type="button"
                        onClick={() => goToBack()}
                    >
                        Back
                    </button>

                    <IconBtn text={"Next"} type={"submit"}>
                        <GrFormNext size={18} />
                    </IconBtn>
                </div>
            </form>
        </div>
    );
}

export default PublishCourse;
