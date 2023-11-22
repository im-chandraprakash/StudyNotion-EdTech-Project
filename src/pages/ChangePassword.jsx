import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AiFillEyeInvisible,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { HiArrowNarrowLeft } from "react-icons/hi";
function ChangePassword() {
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const token = window.location.pathname.split("/").at(-1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        password: "",
        confirmpassword: "",
    });

    const { password, confirmPassword } = formData;

    function handleOnChange(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log("token", token);
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return (
        <div className="text-white flex justify-center items-center h-[90vh]">
            <div>
                {loading ? (
                    <div>Loading ....</div>
                ) : (
                    <div className="flex flex-col gap-6">
                        <h1 className="text-[35px] font-bold text-white">
                            Choose new password
                        </h1>
                        <p className="text-[18px] text-richblack-200">
                            Almost done. Enter your new password and youre all
                            set.
                        </p>

                        <form
                            onSubmit={handleOnSubmit}
                            className="flex flex-col gap-4"
                        >
                            <label className="relative">
                                <p className="text-[15px]">
                                    New Password{" "}
                                    <span className="text-pink-400">*</span>
                                </p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleOnChange}
                                    // value={password}
                                    placeholder="Enter Password"
                                    className="mt-1 w-full p-3 bg-richblack-700 rounded-lg outline-none border-b-[1px] border-richblack-200"
                                />
                                <span
                                    className="absolute top-10 right-4"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                >
                                    {showPassword ? (
                                        <AiFillEyeInvisible fontSize={24} />
                                    ) : (
                                        <AiOutlineEye fontSize={24} />
                                    )}
                                </span>
                            </label>
                            <label className="relative">
                                <p className="text-[15px]">
                                    Confirm New Password{" "}
                                    <span className="text-pink-400">*</span>
                                </p>
                                <input
                                    required
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    onChange={handleOnChange}
                                    // value={confirmpassword}
                                    placeholder="Enter Confirm Password"
                                    className=" mt-1 w-full p-3 bg-richblack-700 rounded-lg outline-none border-b-[1px] border-richblack-200"
                                />

                                <span
                                    className="absolute top-10 right-4"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <AiFillEyeInvisible fontSize={24} />
                                    ) : (
                                        <AiOutlineEye fontSize={24} />
                                    )}
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="w-full text-black font-bold bg-yellow-100 rounded-lg p-2.5 mt-4"
                            >
                                Change Password
                            </button>
                        </form>

                        <div>
                            <Link to="/login">
                                <div className="flex gap-3 items-center">
                                    <HiArrowNarrowLeft />
                                    <p>Back to Login</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChangePassword;
