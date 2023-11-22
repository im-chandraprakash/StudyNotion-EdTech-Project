import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    createCourseAPI,
    editCourseDetailsAPI,
    getCourseCategoryData,
} from "../../../../../services/operations/courseDetailAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { GrFormNext } from "react-icons/gr";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../../utils/constants";
import toast from "react-hot-toast";
import courseSlice, {
    setCourse,
    setEditCourse,
    setStep,
} from "../../../../../slices/courseSlice";
import ChipInput from "./ChipInput";
import Upload from "../Upload";

function CourseInformation() {
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { course, editCourse } = useSelector((state) => state.course);
    const [categoryData, setCategoryData] = useState(null);
    const { token } = useSelector((state) => state.auth);

    let temp = {
        _id: "654deda227f705a4b37a6312",
        name: "DevOps",
        description:
            "DevOps is a collaborative approach that unifies software development (Dev) and IT operations (Ops), emphasizing communication, automation, and continuous integration/continuous deployment (CI/CD) to deliver high-quality software efficiently and quickly.",
        courses: [],
        __v: 0,
    };

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchCategoryData = async () => {
        try {
            const data = await getCourseCategoryData(token);
            console.log("Response category data : ", data);
            setCategoryData(data);
        } catch (error) {
            console.log("categoryData fetch failed", error);
        }
    };

    useEffect(() => {
        console.log("category data", categoryData);
        if (editCourse) {
            // console.log("course useeffect : ", course);
            setValue("courseTitle", course.courseName);
            setValue("courseDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseCategory", temp.name);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course?.thumbnail);
            setValue("courseTags", course.tag);
        }
        fetchCategoryData();
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();

        console.log("is form updated current Value : ", currentValues);
        console.log("is form updated course : ", course);

        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseCategory !== course?.category?._id ||
            currentValues.courseRequirements.toString() !==
                course.instructions.toString() ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseImage !== course?.thumbnail
        ) {
            return true;
        } else {
            return false;
        }
    };

    const continueWithoutSave = () => {
        dispatch(setStep(2));
        dispatch(setEditCourse(false));
    };

    const handleOnSubmit = async (data) => {
        let result;
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);

                if (currentValues.courseTitle !== course.courseTitle) {
                    formData.append("courseName", data.courseTitle);
                }

                if (
                    currentValues.courseDescription !== course.courseDescription
                ) {
                    formData.append(
                        "courseDescription",
                        data.courseDescription
                    );
                }

                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }

                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if (currentValues.courseCategory !== course.category?._id) {
                    formData.append("category", data.courseCategory);
                }

                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append("instructions", data.courseRequirements);
                }

                if (
                    currentValues.courseTags.toString() !==
                    course.tag.toString()
                ) {
                    formData.append("tag", currentValues.courseTags);
                }

                if (currentValues.courseImage !== course?.thumbnail) {
                    formData.append("thumbnail", currentValues.courseImage);
                }

                setLoading(true);

                result = await editCourseDetailsAPI(token, formData);
                setLoading(false);

                console.log("updated course result : ", result);

                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }

                return;
            } else {
                toast.error("NO Changes made so far");
            }
            return;
        }

        const formData = new FormData();

        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.coursePrice);
        formData.append("category", data.courseCategory);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("instructions", data.courseRequirements);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("tag", data.courseTags);
        formData.append("thumbnailImage", data.courseImage);

        //create new course

        console.log("form data is ", data);
        setLoading(true);

        // //call course create function
        result = await createCourseAPI(token, formData);

        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        console.log("result is : ", result);

        setLoading(false);
    };

    return (
        <div className="w-[100%] bg-richblack-800 mt-10 p-6 py-8 rounded-lg border-richblack-600 border-[1px]">
            <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="w-full flex flex-col gap-8 "
            >
                <div className="w-full">
                    <label htmlFor="courseTitle" className="lable-style">
                        <p>
                            Course Title{" "}
                            <sup className="text-pink-100 text-[12px]">*</sup>
                        </p>
                    </label>
                    <input
                        type="text"
                        id="courseTitle"
                        placeholder="Enter Course Title"
                        className="form-style w-full"
                        {...register("courseTitle", { required: true })}
                    />
                    <div className="mt-1">
                        {errors.courseTitle && (
                            <span className="text-pink-200 text-[13px] ml-2">
                                Course Title is Required
                            </span>
                        )}
                    </div>
                </div>
                <div>
                    <label htmlFor="courseDescription" className="lable-style ">
                        <p>
                            Course Short Description{" "}
                            <sup className="text-pink-100 text-[12px]">*</sup>
                        </p>
                    </label>
                    <textarea
                        type="text"
                        rows={5}
                        className="form-style"
                        placeholder="Enter Description"
                        {...register("courseDescription", { required: true })}
                    />
                    {errors.courseDescription && (
                        <span className="text-pink-200 text-[13px] ml-2">
                            Please enter course description
                        </span>
                    )}
                </div>

                <div className="relative">
                    <label htmlFor="price" className="lable-style  ">
                        <p>
                            Course Price{" "}
                            <sup className="text-pink-100 text-[12px]">*</sup>
                        </p>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Course price"
                        className="form-style"
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                        })}
                        id="price"
                    ></input>

                    <HiOutlineCurrencyRupee
                        size={25}
                        className="text-richblack-400 absolute top-1/2 right-2"
                    />

                    <div className="mt-1">
                        {errors.coursePrice && (
                            <span className="text-pink-200 text-[13px] ml-2">
                                Please enter course Price
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="category" className="lable-style ">
                        <p>
                            Course Category{" "}
                            <sup className="text-pink-100 text-[12px]">*</sup>
                        </p>
                    </label>
                    <select
                        {...register("courseCategory", { required: true })}
                        id="category"
                        className="form-style"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Choose an Category
                        </option>
                        {categoryData?.map((category, index) => {
                            return (
                                <option key={index} value={category?._id}>
                                    {category?.name}
                                </option>
                            );
                        })}
                    </select>

                    <div className="mt-1">
                        {errors.courseCategory && (
                            <span className="text-pink-200 text-[13px] ml-2">
                                Course Category is Required
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <ChipInput
                        name={"courseTags"}
                        lable={"Tags"}
                        register={register}
                        getValue={getValues}
                        setValue={setValue}
                        placeholder={"Enter Tags and press Enter"}
                        errors={errors}
                    />
                </div>

                <div>
                    <Upload
                        name={"courseImage"}
                        label={"Course Image"}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        editCourse={editCourse ? course?.thumbnail : null}
                    />
                </div>

                <div>
                    <RequirementField
                        name="courseRequirements"
                        lable="Requirement/Instruction"
                        register={register}
                        getValue={getValues}
                        setValue={setValue}
                        placeholder="Please Add Requirements"
                        errors={errors}
                        editCourse={editCourse}
                    />
                </div>

                <div>
                    <label htmlFor="Benefits" className="lable-style">
                        <p>
                            Benefits of the course{" "}
                            <sup className="text-pink-100 text-[12px]">*</sup>
                        </p>
                    </label>
                    <textarea
                        name="courseBenefits"
                        id="Benefits"
                        rows="5"
                        className="form-style"
                        placeholder="Enter Benefits of the course"
                        {...register("courseBenefits", { required: true })}
                    ></textarea>
                    <div>
                        {errors.courseBenefits && (
                            <span className="text-pink-200 text-[13px] ml-2">
                                Course Benefits is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    {editCourse && (
                        <button
                            onClick={() => continueWithoutSave()}
                            className="px-3 py-2 text-black bg-richblack-500 rounded-lg mr-3 font-semibold"
                        >
                            Continue Without Saving
                        </button>
                    )}
                    <IconBtn
                        type="submit"
                        text={editCourse ? "Save Changes" : "Next"}
                        customClasses={"flex items-center gap-2"}
                    >
                        <GrFormNext size={18} />
                    </IconBtn>
                </div>
            </form>
        </div>
    );
}

export default CourseInformation;
