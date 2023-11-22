import React, { useState } from "react";
import { useForm } from "react-hook-form";

import countryCode from "../../data/countrycode.json";

function ContactUsForm() {
    const { loading, setLoading } = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        try {
            console.log("form data is ", data);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="text-white ">
            <form onSubmit={handleSubmit(submitContactForm)}>
                <div className="flex flex-col gap-4">
                    <div className="w-full flex gap-7">
                        <div className=" flex-1 flex flex-col gap-1">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="Enter first name"
                                className=" w-full p-3 bg-richblack-700 text-richblack-200  rounded-lg outline-none border-b-[1px] border-richblack-100"
                                {...register("firstname", { required: true })}
                            />
                            {errors.firstname && (
                                <span>Please enter your name.</span>
                            )}
                        </div>

                        <div className=" flex-1 flex flex-col gap-1">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Enter last name"
                                className="p-3 bg-richblack-700 text-richblack-200  rounded-lg outline-none border-b-[1px] border-richblack-100"
                                {...register("lastnam")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter your Email"
                            name="email"
                            className="p-3 bg-richblack-700 text-richblack-200  rounded-lg outline-none border-b-[1px] border-richblack-100"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span>Please Enter your Email Address.</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="phonenumber">Phone Number</label>
                        <div className="flex gap-5">
                            <div className="flex w-[81px] flex-col gap-2">
                                <select
                                    name="firstname"
                                    id="firstname"
                                    placeholder="Enter first name"
                                    type="text"
                                    className="p-3 bg-richblack-700 text-richblack-200  rounded-lg outline-none border-b-[1px] border-richblack-100"
                                    {...register("countryCode", {
                                        required: true,
                                    })}
                                >
                                    {countryCode.map((ele, id) => {
                                        return (
                                            <option key={id} value={ele.code}>
                                                {ele.code} - {ele.country}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                                <input
                                    type="number"
                                    id="phonenumber"
                                    name="phonenumber"
                                    placeholder="12345 67890"
                                    className="p-3 bg-richblack-700 text-richblack-200  rounded-lg outline-none border-b-[1px] border-richblack-100 appearance-none"
                                    {...register("phoneNo", {
                                        required: {
                                            value: true,
                                            message:
                                                "Please enter your Phone Number.",
                                        },
                                        maxLength: {
                                            value: 12,
                                            message: "Invalid Phone Number",
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "Invalid Phone Number",
                                        },
                                    })}
                                />
                                {errors.phoneNo && (
                                    <span>{errors.phoneNo.message}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="message">Message</label>

                        <textarea
                            name="message"
                            id="message"
                            placeholder="Enter your message here"
                            cols="30"
                            rows="7"
                            className="w-full p-3 bg-richblack-700 text-richblack-200  rounded-lg outline-none border-b-[1px] border-richblack-100"
                            {...register("message", {
                                required: true,
                            })}
                        />
                        {errors.message && (
                            <span>Please enter your Message.</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-100 text-black font-semibold rounded-lg p-3"
                    >
                        {" "}
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactUsForm;
