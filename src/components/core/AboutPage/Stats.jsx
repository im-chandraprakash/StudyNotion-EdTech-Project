import React from "react";

const data = [
    {
        count: "25k",
        label: "Active Students",
    },
    {
        count: "10+",
        label: "Mentors",
    },
    {
        count: "200+",
        label: "Courses",
    },
    {
        count: "50+",
        label: "Awards",
    },
];
function Stats() {
    return (
        <div className="flex justify-around py-10 px-8 bg-richblack-700 font-bold my-32">
            {data.map((item, id) => (
                <div
                    key={id}
                    className="text-white flex  items-center flex-col "
                >
                    <h1 className="text-[32px] tracking-wide">{item.count}</h1>
                    <p className="text-richblack-200 text-[16px] leading-3">
                        {item.label}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Stats;
