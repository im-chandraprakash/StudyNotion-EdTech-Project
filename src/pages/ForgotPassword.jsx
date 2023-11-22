import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { FaArrowLeftLong } from "react-icons/fa6";

function ForgotPassword() {
    const [email, setEmail] = useState();
    const [emailSent, setEmailSend] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function handleOnSubmit(e) {
        e.preventDefault();

        dispatch(getPasswordResetToken(email, setEmailSend));

        console.log("hello dear");
    }
    return (
        <div className="text-white flex justify-center items-center h-[90vh]">
            <div className="max-w-[450px]">
                {loading && <div> Loading ...</div>}
                <div className="flex flex-col gap-5">
                    <h1 className="text-[36px] font-bold">
                        {!emailSent
                            ? "Reset your Password"
                            : "Check your Email"}
                    </h1>

                    <p className="text-richblack-300 text-[17px]">
                        {!emailSent
                            ? "Have no fear. we'll email you intructions to reset your password. if you don't have access to your email we can try account recovery"
                            : `We have sent the reset email to ${email}`}
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        {!emailSent && (
                            <label>
                                <p className="text-[16px]">
                                    Email Address{" "}
                                    <span className={"text-pink-400"}> *</span>
                                </p>

                                <input
                                    type="text"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your Email Address"
                                    className="w-full p-3 bg-richblack-700 mt-1 rounded-lg border-b-[1.5px] border-richblack-200 outline-none"
                        
                                />
                            </label>
                        )}
                        <button
                            type="submit"
                            className="mt-4 w-full bg-yellow-100 p-3 rounded-lg text-black font-bold"
                        >
                            {!emailSent ? "Submit" : "Resent Email Address"}
                        </button>
                    </form>

                    <div>
                        <Link to="/login">
                            <div className="flex gap-3 items-center">
                                <FaArrowLeftLong />
                                <p>Back to Login</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
