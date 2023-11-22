import React, { useState } from "react";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
import toast from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const tabData = [
    {
        id: 1,
        tabName: "Student",
        type: "Student",
    },
    {
        id: 2,
        tabName: "Instructor",
        type: "Instructor",
    },
];

function SignupForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password Do not Match");
            return;
        }

        const signupData = {
            ...formData,
            accountType,
        };

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData));
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate));

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setAccountType(ACCOUNT_TYPE.STUDENT);
    };
    return (
        <div
            className={
                "bg-richblack-900 text-white flex items-center justify-center"
            }
        >
            <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-x-60 -ml-[0.5px]">
                <Tab
                    tabData={tabData}
                    field={accountType}
                    setField={setAccountType}
                ></Tab>
                <form
                    className="flex w-full flex-col gap-y-4 mt-0"
                    onSubmit={handleOnSubmit}
                >
                    <div className="flex gap-x-5">
                        <label>
                            <p className="text-[14px]">
                                First Name{" "}
                                <sup className="text-pink-200">*</sup>
                            </p>

                            <input
                                required
                                type="text"
                                name="firstName"
                                placeholder="FirstName"
                                value={firstName}
                                onChange={handleOnChange}
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="mt-1 py-2.5 px-4 rounded-lg bg-richblack-700 outline-none"
                            />
                        </label>

                        <label>
                            <p className="text-[14px]">
                                LastName <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleOnChange}
                                placeholder="LastName"
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="mt-1 py-2.5 px-4 rounded-lg bg-richblack-700 outline-none"
                            />
                        </label>
                    </div>

                    <label className={"w-full"}>
                        <p className="text-[14px]">
                            Email Address <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            type="text"
                            required
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder="Enter email address"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="mt-1 py-2.5 px-4 rounded-lg bg-richblack-700 outline-none"
                        />
                    </label>
                    <div className="flex gap-5">
                        <label className="relative">
                            <p className="text-[14px]">
                                Create Password{" "}
                                <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                name="password"
                                // value={password}
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="mt-1 py-2.5 px-4 rounded-lg bg-richblack-700 outline-none"
                            />

                            <span
                                className="absolute right-3 top-9 cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                )}
                            </span>
                        </label>
                        <label className="relative">
                            <p className="text-[14px]">
                                Confirm Password{" "}
                                <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                // value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm Password"
                                className="mt-1 py-2.5 px-4 rounded-lg bg-richblack-700 outline-none"
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                            />

                            <span
                                className="absolute right-3 top-9 cursor-pointer"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                )}
                            </span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 bg-yellow-100 rounded-lg py-2 text-black font-bold "
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;
