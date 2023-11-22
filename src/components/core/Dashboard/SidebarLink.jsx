import React from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import * as Icon1 from "react-icons/vsc";
import * as Icon2 from "react-icons/ai";
import { useDispatch } from "react-redux";

function SidebarLink({ iconName, link }) {
    const Icon = Icon1[iconName];
    const IconA = Icon2[iconName];
    const location = useLocation();

    function matchRoute(route) {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <Link
            to={link.path}
            className={`relative px-8 py-2 text-sm font-medium ${
                matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
            }`}
        >
            <span
                className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
                    matchRoute(link.path) ? "opacity-100" : "opacity-0"
                }`}
            ></span>
            <div
                className={`flex items-center gap-x-2 ${
                    matchRoute(link.path)
                        ? "text-yellow-50 text-[15px]"
                        : "text-richblack-100"
                }`}
            >
                {Icon && <Icon className="text-lg" />}
                {IconA && <IconA className="text-lg" />}

                <span>{link.name}</span>
            </div>
        </Link>
    );
}

export default SidebarLink;
