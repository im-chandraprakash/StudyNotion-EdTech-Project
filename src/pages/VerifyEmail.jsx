import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { HiArrowNarrowLeft } from "react-icons/hi";
import {RxCountdownTimer} from 'react-icons/rx'

function VerifyEmail() {
    const { loading } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState();

    const { signupData } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, []);

    function handleOnSubmit(e) {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
        } = signupData;

        console.log("call for signup");

        dispatch(
            signUp(
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            )
        );
    }

    return (
        <div className="text-white flex justify-center items-center h-[90vh]">
            <div className="">
                {loading ? (
                    <div>Loading ...</div>
                ) : (
                    <div className="flex flex-col gap-2 max-w-[450px]">
                        <h1 className="text-[33px] text-white font-semibold">
                            Verify Email
                        </h1>
                        <p className="text-[19px] text-richblack-300 leading-6">
                            A verification code has been sent to you. Enter the
                            code below
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        placeholder="-"
                                        style={{
                                            boxShadow:
                                                "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />

                            <button
                                type="submit"
                                className="w-full text-center p-3 bg-yellow-100 mt-5 text-black font-bold rounded-lg"
                            >
                                Verify Email
                            </button>
                        </form>

                        <div className="flex justify-between text-[17px] mt-4">
                            <div>
                                <Link to={"/signup"}>
                                    <div className="flex gap-2 items-center">
                                        <HiArrowNarrowLeft />
                                        <p>Back to Signup</p>
                                    </div>
                                </Link>
                            </div>

                            <div
                                onClick={() =>
                                    dispatch(
                                        sendOtp(signupData.email, navigate)
                                    )
                                }
                                className={"cursor-pointer"}
                            >
                                <div className="flex gap-2 items-center text-blue-200">
                                    <RxCountdownTimer />
                                    <p>Resent it</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;
