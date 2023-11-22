import React from "react";
import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useSelector } from "react-redux";

function Template({ title, description1, description2, image, formType }) {
    const { loading } = useSelector((state) => state.auth);

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                    <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {title}
                        </h1>
                        <div className="mt-4 text-[1.125rem] leading-[1.625rem]">
                            <div className="text-richblack-100">
                                {description1}
                            </div>{" "}
                            <div className="font-edu-sa font-bold italic text-blue-100 text-[17px]">
                                {description2}
                            </div>
                        </div>
                        {formType === "signup" ? <SignupForm /> : <LoginForm />}
                    </div>
                    <div
                        className={`relative mx-auto w-11/12 max-w-[450px] md:mx-0  ${
                            formType === "signup"
                                ? "flex items-center -translate-y-2"
                                : ""
                        }`}
                    >
                        <img
                            src={frameImg}
                            alt="Pattern"
                            width={558}
                            height={504}
                            loading="lazy"
                        />

                        <img
                            src={image}
                            alt="Students"
                            width={558}
                            height={504}
                            loading="lazy"
                            className={`${
                                formType === "signup"
                                    ? "absolute top-[20px] lg:top-[59px] right-4 z-10 "
                                    : "absolute -top-[15px] right-4 z-10"
                            }`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Template;
