import React from "react";
import { Link } from "react-router-dom";

function Button({ path, children, active }) {
    return (
        <Link to={path}>
            <div
                className={`w-full px-7 py-3 rounded text-[15px] sm:text-[20px] font-bold text-center hover:scale-95 transition-all  ${
                    active
                        ? "bg-yellow-50 text-richblack-900 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.9)] "
                        : "bg-richblack-800 text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] "
                }`}
            >
                {children}
            </div>
        </Link>
    );
}
export default Button;
