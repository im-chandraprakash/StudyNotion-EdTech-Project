import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";
import { RxCross1 } from "react-icons/rx";
import {
    createSubSectionAPI,
    updateSubSectionAPI,
} from "../../../../../services/operations/courseDetailAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";

function SubSectionModal({
    modalData,
    setModalData,
    edit = false,
    view = false,
    add = false,
}) {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState();

    console.log("modalData : ", modalData, view, edit);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm();

    useEffect(() => {
        if (view || edit) {
            console.log("modal data : ", modalData);
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDescription !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleEditSubSection = async (data) => {
        const currentValues = getValues();
        const formData = new FormData();

        console.log("get Values ", getValues());

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureDescription !== modalData.description) {
            formData.append("description", currentValues.lectureDescription);
        }
        // confusion
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        //make API call
        const result = await updateSubSectionAPI(token, formData);
        if (result) {
            console.log("subsection update result", result);

            let updatedData = course.courseContent.map((section) =>
                section._id === result._id ? result : section
            );

            const courseUpdated = { ...course, courseContent: updatedData };

            dispatch(setCourse(courseUpdated));
            setModalData(null);

            console.log("updated : ", courseUpdated);
        }
    };

    const onSubmit = async (data) => {
        if (view) {
            return;
        }

        if (edit) {
            if (isFormUpdated()) {
                handleEditSubSection(data);
            } else {
                toast.error("No changes made");
            }
            return;
        }

        console.log("data onsubmit ", data, modalData);
        const formData = new FormData();

        formData.append("sectionId", modalData._id);
        // formData.append("subSectionId" , modalData.subsection);

        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("video", data.lectureVideo);

        const result = await createSubSectionAPI(token, formData);

        console.log("add video : ", result);

        console.log("result ", result);

        if (result) {
            let updatedCourse = course.courseContent.map((section) =>
                section._id === result._id ? result : section
            );

            const updatedCourseContent = {
                ...course,
                courseContent: updatedCourse,
            };

            dispatch(setCourse(updatedCourseContent));
            setModalData(null);
        }
    };

    return (
        <div className="fixed inset-0 grid place-items-center z-[100] backdrop-blur-sm bg-opacity-10  overflow-auto h-screen w-screen">
            <div className="my-10 w-11/12 max-w-[700px]  bg-richblack-800  border-[1px] border-richblack-400 rounded-lg">
                <div className="flex justify-between font-bold bg-richblack-700  py-5 px-5 text-[20px] rounded-[9px]">
                    <p className="">
                        {view ? "Viewing" : edit ? "Editing" : "Adding"} Lecture
                    </p>

                    <div
                        className="cursor-pointer"
                        onClick={() => setModalData(false)}
                    >
                        <RxCross1 />
                    </div>
                </div>

                <form
                    className=" p-3 py-8 px-8"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        video={true}
                        viewData={view ? modalData?.videoUrl : null}
                        editData={edit ? modalData?.videoUrl : null}
                    />

                    <div className="mt-8">
                        <label htmlFor="lectureTitle" className="lable-style">
                            <p>
                                Lecture Title{" "}
                                {!view && (
                                    <sup className="text-pink-200">*</sup>
                                )}
                            </p>
                        </label>
                        <input
                            disabled = {view }
                            type="text"
                            placeholder="Enter Lecture Title"
                            id="lectureTitle"
                            {...register("lectureTitle", { required: true })}
                            className="form-style"
                        />
                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture Title is Required
                            </span>
                        )}
                    </div>

                    <div className="mt-8">
                        <label htmlFor="lectureDesc">
                            Lecture Description{" "}
                            {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            disabled = {view}
                            type="text"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDescription", {
                                required: true,
                            })}
                            rows={6}
                            className="form-style"
                        />
                        {errors.lectureDescription && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                lecture Description is required
                            </span>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        {!view && (
                            <IconBtn
                                type={"submit"}
                                text={
                                    loading
                                        ? "Loading ..."
                                        : edit
                                        ? "Save Change"
                                        : "Save"
                                }
                            ></IconBtn>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SubSectionModal;
