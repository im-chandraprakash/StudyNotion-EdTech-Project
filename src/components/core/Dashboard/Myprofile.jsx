import React from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Myprofile() {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    // console.log("user data , ", user);
    return (
        <div className="text-white">
            <div className="mx-auto w-11/12 max-w-maxContent text-white mt-14">
                <h1 className="text-4xl">My Profile</h1>
                <div className="flex flex-col gap-10 my-10 mb-20">
                    {/* section 1 */}
                    <div className="bg-richblack-800 flex flex-wrap justify-between items-center px-10 py-8 gap-6 rounded-lg border-[1px] border-richblack-700">
                        <div className="flex items-center gap-4">
                            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                                <img src={user?.image} alt={user?.firstName} />
                            </div>

                            <div>
                                <p className="font-bold text-lg">
                                    {user?.firstName + " " + user?.lastName}
                                </p>
                                <p className="text-richblack-200 text-sm mt-1">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <IconBtn
                            text={"Edit"}
                            onclick={() => {
                                navigate("/dashboard/settings");
                            }}
                        >
                            <RiEditBoxLine />
                        </IconBtn>
                    </div>

                    <div className="bg-richblack-800 flex flex-col px-10 py-8 rounded-lg border-[1px] border-richblack-700">
                        <div className="flex justify-between">
                            <p className="font-bold text-lg">About</p>
                            <IconBtn
                                text={"Edit"}
                                onclick={() => {
                                    navigate("/dashboard/settings");
                                }}
                            >
                                <RiEditBoxLine />
                            </IconBtn>
                        </div>

                        <span className="h-[30px]"></span>

                        <p className="text-sm">
                            {user?.additionalDetails?.about ??
                                "Write Something About Yourself"}
                        </p>
                    </div>

                    <div className="bg-richblack-800 flex flex-col px-10 py-8 rounded-lg border-[1px] border-richblack-700">
                        <div className="flex justify-between">
                            <p className="font-bold text-lg">
                                Personal Details
                            </p>
                            <IconBtn
                                text={"Edit"}
                                onclick={() => {
                                    navigate("/dashboard/settings");
                                }}
                            >
                                <RiEditBoxLine />
                            </IconBtn>
                        </div>

                        <div className="text-white mt-7 grid grid-rows-3 grid-cols-2 gap-6">
                            <div className="text-sm">
                                <p className={"mb-1 text-richblack-400"}>
                                    First Name
                                </p>
                                <p className="font-bold">{user?.firstName}</p>
                            </div>
                            <div className="text-sm">
                                <p className={"mb-1 text-richblack-400"}>
                                    Last Name
                                </p>
                                <p className="font-bold">{user?.lastName}</p>
                            </div>
                            <div className="text-sm">
                                <p className={"mb-1 text-richblack-400"}>
                                    Email
                                </p>
                                <p className="font-bold">{user?.email}</p>
                            </div>
                            <div className="text-sm">
                                <p className={"mb-1 text-richblack-400"}>
                                    Contact Number
                                </p>
                                <p className="font-bold">
                                    {user?.additionalDetails.contactNumber ?? "Add Contact Number"}
                                </p>
                            </div>
                            <div className="text-sm">
                                <p className={"mb-1 text-richblack-400"}>
                                    Gender
                                </p>
                                <p className="font-bold">
                                    {user?.additionalDetails.gender ??
                                        "Add Gender"}
                                </p>
                            </div>
                            <div className="text-sm">
                                <p className={"mb-1 text-richblack-400"}>
                                    Date of Birth
                                </p>
                                <p className="font-bold">
                                    {user?.additionalDetails.dateOfBirth  ?? "Add Date of Birth"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Myprofile;
