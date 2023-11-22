import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import IconBtn from "../../common/IconBtn";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import { createRatingAPI } from "../../../services/operations/courseDetailAPI";

function CourseReviewModal({ setReviewCourseModal }) {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    };

    const onSubmit = async (data) => {
        console.log("data ", data);
        await createRatingAPI(token, {
            rating: data.courseRating,
            reviews: data.courseExperience,
            courseId: courseEntireData?._id,
        });

        setReviewCourseModal(false);
    };

    return (
        <div className="fixed inset-0 grid place-items-center z-[100] bg-opacity-10 backdrop-blur-sm">
            <div className="w-[700px] bg-richblack-800 z-1000 rounded-lg  border border-richblack-400 overflow-hidden">
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        Add Review
                    </p>
                    <button onClick={() => setReviewCourseModal(false)}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                <div className="flex items-center justify-center gap-x-4 mt-8">
                    <img
                        src={user?.image}
                        alt={user?.firstName + "profile"}
                        className="aspect-square w-[50px] rounded-full object-cover"
                    />
                    <div className="">
                        <p className="font-semibold text-richblack-5">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-richblack-5">
                            Posting Publicly
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="my-4 flex flex-col items-center"
                >
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={40}
                        activeColor="#ffd700"
                    />
                    <div className="flex w-11/12 flex-col space-y-2">
                        <label
                            className="text-sm text-richblack-5"
                            htmlFor="courseExperience"
                        >
                            Add Your Experience{" "}
                            <sup className="text-pink-200">*</sup>
                        </label>
                        <textarea
                            id="courseExperience"
                            placeholder="Add Your Experience"
                            {...register("courseExperience", {
                                required: true,
                            })}
                            className="form-style resize-x-none min-h-[130px] w-full"
                        />
                        {errors.courseExperience && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Please Add Your Experience
                            </span>
                        )}
                    </div>

                    <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                        <button
                            onClick={() => setReviewCourseModal(false)}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            Cancel
                        </button>
                        <IconBtn text="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CourseReviewModal;
