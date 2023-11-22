import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../assets/Logo/Logo-Full-Light.png";

const company = ["About", "Careers", "Affiliates"];
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];

const plans = ["Paid memberships", "For students", "Business solutions"];
const community = ["Forums", "Chapters", "Events"];

function Footer() {
    return (
        <div className="bg-richblack-800 text-white ">
            <div className="w-11/12 mx-auto max-w-maxContent py-16 flex flex-wrap sm:gap-[40px] lg:gap-x-[40px] gap-y-20">
                <div className="flex flex-wrap  gap-x-12 text-richblack-100 gap-10 px-4">
                    <div>
                        <div>
                            <img src={logo} alt="" />
                        </div>
                        <div className="mt-4 leading-[35px]">
                            <h2 className="font-bold">Company</h2>
                            {company.map((title, index) => {
                                return (
                                    <p key={index} className="text-richblack-400 text-[14px] tracking-wide">
                                        {title}
                                    </p>
                                );
                            })}
                        </div>

                        <div className="text-[20px] mt-6 flex gap-4">
                            <FaFacebook />
                            <FaGoogle />
                            <FaTwitter />
                            <FaYoutube />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2 className="font-bold text-[17px] text-richblack-100">
                                Resources
                            </h2>
                            <div className="mt-4 leading-[35px]">
                                {Resources.map((title, index) => {
                                    return (
                                        <p key={index} className="text-richblack-400 text-[14px] tracking-wide">
                                            {title}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mt-4 leading-[35px]">
                            <h2 className="font-bold">Support</h2>
                            <p className="text-[14px]">Help Center</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2 className="font-bold text-[17px] text-richblack-100">
                                Plans
                            </h2>
                            <div className="mt-4 leading-[35px]">
                                {plans.map((title, index) => {
                                    return (
                                        <p key = {index} className="text-richblack-400 text-[14px] tracking-wide">
                                            {title}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="mt-5 font-bold text-[17px] text-richblack-100">
                                Community
                            </h2>
                            <div className="mt-4 leading-[35px]">
                                {community.map((title, index) => {
                                    return (
                                        <p key={index} className="text-richblack-400 text-[14px] tracking-wide">
                                            {title}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" lg:pl-[60px] lg:border-l-[1px]  lg:border-richblack-600 sm:border-none flex flex-row gap-20 flex-wrap pl-[15px]">
                    {FooterLink2?.map((item, index) => {
                        return (
                            <div key={index}>
                                <h1 className="font-bold text-[17px] text-richblack-100">
                                    {item.title}
                                </h1>
                                <div className={"mt-4 leading-[35px]"}>
                                    {item?.links?.map((links, index) => {
                                        return (
                                            <Link key={index} to={links.link}>
                                                {
                                                    <p className="text-richblack-400 text-[14px] tracking-wide">
                                                        {links.title}
                                                    </p>
                                                }
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className=" border-t-[1px] border-richblack-600 w-11/12 mx-auto max-w-maxContent text-[16px] p-10  text-richblack-400 flex justify-between flex-wrap gap-y-6 ">
                <div className="flex gap-x-3">
                    <p>Privacy</p> <p>|</p>
                    <p>Cookie Policy </p> <p>|</p>
                    <p>Terms </p>
                </div>
                <div>
                    <div>Made with ❤️ CodeHelp © 2023 Studynotion</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
