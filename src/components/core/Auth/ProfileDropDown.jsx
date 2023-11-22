import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authAPI";
// import {VsSignOut} from 'react-icons/'

function ProfileDropDown() {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    return (
        <button className="relative">
            <div
                className=" flex items-center gap-x-1"
                onClick={() => setOpen(!open)}
            >
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[30px] rounded-full object-cover"
                />
                <AiOutlineCaretDown />
            </div>

            {open && (
                <div className="z-50 absolute top-9 -left-20 bg-richblack-800 rounded-lg overflow-hidden">
                    <Link
                        to={"/dashboard/my-profile"}
                        onClick={() => setOpen(false)}
                    >
                        <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                            <VscDashboard className="text-lg" /> Dashboard
                        </div>
                    </Link>

                    <div
                        className="z-50 border-t-[0.5px] border-richblack-600 flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 cursor-pointer hover:bg-richblack-700 hover:text-richblack-25"
                        onClick={() => {
                            setOpen(false);
                            dispatch(logout(navigate));
                        }}
                    >
                        <VscSignOut className="text-lg" />
                        Logout
                    </div>
                </div>
            )}
        </button>
    );
}

export default ProfileDropDown;
