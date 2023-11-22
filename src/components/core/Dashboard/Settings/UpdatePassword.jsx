import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassword } from "../../../../services/operations/SettingsAPI";

function UpdatePassword() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleUpdatePassword = (data) => {
        try {
            dispatch(ChangePassword(token, data));
        } catch (error) {
            console.log("update password error", error.message);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(handleUpdatePassword)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label
                                htmlFor="currentPassword"
                                className="lable-style"
                            >
                                <p>Current Password</p>
                            </label>

                            <input
                                type="text"
                                id="currentPassword"
                                placeholder="Enter Current Password"
                                name="currentPassword"
                                {...register("currentPassword", {
                                    required: true,
                                })}
                                className="form-style"
                            />

                            {errors.currentPassword && (
                                <span>Please Enter your current Password</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label
                                htmlFor="newPassword"
                                className="lable-style"
                            >
                                <p>New Password</p>
                            </label>

                            <input
                                type="text"
                                id="newPassword"
                                placeholder="Enter New Password"
                                name="newPassword"
                                {...register("newPassword", { required: true })}
                                className="form-style"
                            />

                            {errors.newPassword && (
                                <span>Please Enter your New Password</span>
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
                        <IconBtn type="submit" text={"Update"} />
                    </div>
                </div>
            </form>
        </>
    );
}

export default UpdatePassword;
