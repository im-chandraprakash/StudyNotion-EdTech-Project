import React from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { useState } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { GrFormNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
    setStep,
    setEditCourse,
    setCourse,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import NestedView from "./NestedView";
import {
    createSectionAPI,
    editSectionNameAPI,
} from "../../../../../services/operations/courseDetailAPI";

function CourseBuilderFrom() {
    const { course } = useSelector((state) => state.course);
    const [editSectionName, setEditSectionName] = useState(null);
    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm();

    const handleCancleEdit = () => {
        setEditSectionName(null);
        setValue("courseSectionName", "");
    };

    const goToBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    };
    const goToNext = () => {
        if (course?.courseContent.length === 0) {
            toast.error("atleast 1 section is required");
            return;
        }
        if (
            course?.courseContent.some(
                (section) => section.subSection.length === 0
            )
        ) {
            toast.error("each Section should have 1 subSection");
            return;
        }

        dispatch(setStep(3));
    };

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            handleCancleEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("courseSectionName", sectionName);
    };

    const onSubmit = async (data) => {
        let result = null;
        if (editSectionName) {
            result = await editSectionNameAPI(token, {
                courseId: course?._id,
                sectionId: editSectionName,
                sectionName: data.courseSectionName,
            });
            console.log("hello result", result);
        } else {
            const formData = new FormData();

            formData.append("sectionName", data.courseSectionName);
            formData.append("courseId", course._id);
            result = await createSectionAPI(token, formData);

            console.log("home result", result);
        }

        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("courseSectionName", "");
        }
    };

    return (
        <div className="text-white bg-richblack-800 rounded-lg p-6 py-8 border-[1px] border-richblack-600 mt-10">
            <h1 className="text-2xl ">Course Builder</h1>
            <form className="mt-7" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <label htmlFor="courseSection" className="lable-style">
                        <p>
                            Section Name{" "}
                            <sup className="text-pink-200 text-[12px]">*</sup>
                        </p>
                    </label>

                    <input
                        type="text"
                        id="courseSection"
                        placeholder="Add a section to build your course"
                        {...register("courseSectionName", { required: true })}
                        className="form-style"
                    />

                    <div className="mt-1">
                        {errors.courseSectionName && (
                            <span className="text-pink-200 text-[13px] ml-2">
                                Course Section is Required
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex gap-6">
                    <IconBtn
                        type={"submit"}
                        outline="none"
                        text={
                            editSectionName
                                ? "Edit Section Name"
                                : "Create Section"
                        }
                        customClasses={"text-yellow-50"}
                    >
                        <BiMessageSquareAdd size={18} />
                    </IconBtn>

                    {editSectionName && (
                        <button
                            className="text-[15px] text-richblack-400 underline"
                            type="button"
                            onClick={() => handleCancleEdit()}
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <div>
                <NestedView
                    handleChangeEditSectionName={handleChangeEditSectionName}
                />
            </div>

            <div className="flex gap-4 justify-end mt-10">
                <button
                    className="px-5 py-2 bg-richblack-300 text-black semibold rounded-lg"
                    type="button"
                    onClick={() => goToBack()}
                >
                    Back
                </button>
                <div onClick={() => goToNext()}>
                    <IconBtn text={"Next"}>
                        <GrFormNext size={18} />
                    </IconBtn>
                </div>
            </div>
        </div>
    );
}

export default CourseBuilderFrom;
