import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { UpdateProfile } from "../../../../services/operations/SettingsAPI";

function EditProfile() {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitProfileForm = async (data) => {
        try {
            dispatch(UpdateProfile(token, data));
        } catch (error) {
            console.log("Error message - ", error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="lable-style">
                                <p>First Name</p>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter FirstName - "
                                {...register("firstName", { required: true })}
                                name="firstName"
                                className="form-style"
                                defaultValue={user?.firstName}
                            />

                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your first name.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className="lable-style">
                                <p>Last Name</p>
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Enter LastName - "
                                {...register("lastName", { required: true })}
                                name="lastName"
                                className="form-style"
                                defaultValue={user?.lastName}
                            />
                            {errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your last name.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label
                                htmlFor="dateOfBirth"
                                className="lable-style"
                            >
                                <p>Date of Birth</p>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="form-style"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message:
                                            "Please enter your date of Birth",
                                    },
                                    max: {
                                        value: new Date()
                                            .toISOString()
                                            .split("T")[0],
                                        message:
                                            "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={
                                    user?.additionalDetails?.dateOfBirth
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="lable-style">
                                <p>Gender</p>
                            </label>
                            <select
                                type="text"
                                name="gender"
                                id="gender"
                                className="form-style"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Prefer Not to Say">
                                    Prefer Not to Say
                                </option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please select your gender
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label
                                htmlFor="contactNumber"
                                className="lable-style"
                            >
                                <p>Contact Number</p>
                            </label>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                placeholder="Enter Contact Number"
                                className="form-style"
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message:
                                            "Please enter your Contact number",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Invalid Contact Number",
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Invalid Contact Number",
                                    },
                                })}
                                defaultValue={
                                    user?.additionalDetails?.contactNumber
                                }
                            />

                            {errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter your contact Number
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="lable-style">
                                <p>About</p>
                            </label>
                            <input
                                type="text"
                                id="about"
                                placeholder="Write Something about yourself"
                                defaultValue={user?.additionalDetails?.about}
                                name="about"
                                {...register("about", { required: true })}
                                className="form-style"
                            />
                            {errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Write Something about yourself
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => {
                                navigate("/dashboard/my-profile");
                            }}
                            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                        >
                            Cancel
                        </button>
                        <IconBtn type="submit" text={"Save"} />
                    </div>
                </div>
            </form>
        </>
    );
}

export default EditProfile;
