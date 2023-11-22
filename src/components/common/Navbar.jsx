import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const [apiData, setApiData] = useState();

    const fetchData = async () => {
        try {
            const result = await apiConnector("Get", categories.CATEGORIES_API);
            // console.log("response : ", result.data.result);
            setApiData(result.data.result);
        } catch (error) {
            console.log("Api call for sublink failed", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    function matchRoute(path) {
        if (path == location.pathname) {
            return true;
        }
        return false;
    }

    return (
        <div className="h-14 bg-richblack-900 border-b-[1px] border-richblack-500">
            <div className="w-11/12 h-full max-w-maxContent mx-auto  flex items-center justify-between ">
                <Link to={"/"}>
                    <img src={logo} alt="logo image" width={160} height={42} />
                </Link>

                <div className="flex items-center gap-5">
                    <nav className="hidden md:flex ">
                        <ul className="flex gap-x-6">
                            {NavbarLinks.map((links, index) => (
                                <li key={index}>
                                    {links.title == "Catalog" ? (
                                        <div className="relative group cursor-pointer">
                                            <p className="text-richblack-25 flex items-center gap-x-[2px]">
                                                {links.title}{" "}
                                                <IoIosArrowDown className=" text-[20px]" />
                                            </p>

                                            <div className="invisible opacity-0 absolute left-[50%] top-[50%]  flex  translate-x-[-50%] translate-y-[3em] flex-col rounded-lg transition-all duration-200 z-[1000] bg-richblack-5 text-richblack-900 w-[200px] py-3 px-3 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] ">
                                                <div className=" absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                                                {apiData?.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        to={`/catalog/${link.name
                                                            .split(" ")
                                                            .join("-")
                                                            .toLowerCase()}`}
                                                        className="hover:bg-richblack-100 p-3  rounded-lg"
                                                    >
                                                        {link?.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={links.path} className="">
                                            <p
                                                className={` ${
                                                    matchRoute(links.path)
                                                        ? "text-yellow-25"
                                                        : "text-richblack-25"
                                                }`}
                                            >
                                                {links.title}
                                            </p>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="text-white flex gap-3 flex-row-reverse items-center">
                        <div className="hidden md:flex">
                            {token == null && (
                                <Link to={"/login"}>
                                    <button className="bg-richblack-800 border-[1px] border-richblack-500 text-richblack-100 py-1.5 px-4 rounded-md">
                                        Log in
                                    </button>
                                </Link>
                            )}
                            {token == null && (
                                <Link to="/signup">
                                    <button className="ml-5 bg-richblack-800 border-[1px] border-richblack-500 text-richblack-100 py-1.5 px-4 rounded-md">
                                        Sign up
                                    </button>
                                </Link>
                            )}
                        </div>

                        <div className="flex gap-5 items-center">
                            {user && user?.accountType !== "Instructor" && (
                                <Link
                                    to={"/dashboard/cart"}
                                    className="relative"
                                >
                                    <AiOutlineShoppingCart className="text-[25px] text-richblack-50" />
                                    {totalItems > 0 && (
                                        <span className=" top-[12px] left-3 w-[21px] h-[21px] font-bold absolute text-center text-[14px] pt-[0.7px] bg-richblack-700 text-yellow-50 rounded-full">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            )}
                            {token !== null && <ProfileDropDown />}
                        </div>
                        <div className="flex md:hidden text-richblack-100">
                            <RxHamburgerMenu size={25} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
