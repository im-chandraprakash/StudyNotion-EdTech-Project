import React, { useState } from "react";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";
function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    function handleOnChange(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    }
    return (
        <div
            className={
                " bg-richblack-900 w-[100%]  text-white flex justify-center items-center"
            }
        >
            <div
                className="w-11/12 max-w-maxContent mx-auto flex justify-between
             items-center gap-x-48 -ml-[0.5px]"
            >
                <form
                    className="w-[100%] flex flex-col gap-y-2 mt-8"
                    onSubmit={handleOnSubmit}
                >
                    <label htmlFor="email">
                        <p className="mb-1">
                            Email Address{" "}
                            <sup className={"text-pink-200"}>*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="email"
                            onChange={handleOnChange}
                            placeholder="Enter Email Address :"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255 , 255 , 255 , 0.18)",
                            }}
                            className="w-[100%] py-2.5 px-5 rounded-lg bg-richblack-700 text-richblack-100 border-b-[1px] border-richblack-100 outline-none"
                        />
                    </label>

                    <label htmlFor="password" className=" relative mt-4">
                        <p className="mb-1">
                            Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={handleOnChange}
                            placeholder="Enter Password :"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-[100%] py-2.5 px-5 rounded-lg bg-richblack-700 text-richblack-100 border-b-[1px] border-richblack-100 outline-none"
                        />

                        <span
                            className={"absolute right-3 top-9 cursor-pointer"}
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible
                                    fontSize={24}
                                    fill="#AFB2BF"
                                />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>

                        <Link to={"/forgot-password"}>
                            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                                Forget Password
                            </p>
                        </Link>
                    </label>

                    <button
                        type="submit"
                        className={
                            "bg-yellow-200 text-richblack-900 font-bold py-2 text-[17px] rounded-lg mt-6"
                        }
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
export default LoginForm;
