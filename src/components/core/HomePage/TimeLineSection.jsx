import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImga from "../../../assets/Images/TimelineImage.png";

function TimeLineSection() {
    const TimeLine = [
        {
            logo: Logo1,
            heading: "Leadership",
            subheading: "Fully committed to the success company",
        },
        {
            logo: Logo2,
            heading: "Responsibility",
            subheading: "Students will always be our top priority",
        },
        {
            logo: Logo3,
            heading: "Flexibility ",
            subheading: "The ability to switch is an important skills",
        },
        {
            logo: Logo4,
            heading: "Solve the problem",
            subheading: "Code your way to a solution",
        },
    ];
    return (
        <div className="flex flex-col lg:flex-row items-center gap-12 justify-around">
            <div className="">
                {TimeLine.map((item, id) => {
                    return (
                        <div key={id}>
                            <div className="flex  gap-x-10">
                                <div
                                    className={
                                        "rounded-full w-[60px] h-[60px] bg-white flex items-center justify-center"
                                    }
                                >
                                    <img src={item.logo} alt={item.heading} />
                                </div>
                                <div>
                                    <div className="text-[20px] font-semibold shadow-[#00000012] shadow-[0_0_62px_0] text-richblack-600">
                                        {item.heading}
                                    </div>
                                    <div className={"text-base mt-0"}>
                                        {item.subheading}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${
                                    TimeLine.length - 1 === id
                                        ? "hidden"
                                        : "lg:block"
                                } ml-7 my-2 border-l-[0.1px] border-richblack-100 h-[50px]`}
                            ></div>
                        </div>
                    );
                })}
            </div>
            <div className="lg:w-[50%] relative flex justify-center items-center">
                {/* shadow-blue-200 shadow-[0px_0px_30px_0px] */}
                <div className="flex w-[500px]  lg:w-full z-0 shadow-blue-200 shadow-[0px_0px_30px_0px]">
                    <img
                        src={timeLineImga}
                        alt="timelineImaage"
                        className="w-full object-cover z-0"
                    />
                </div>
                <div
                    className={
                        "absolute flex-col lg:flex-row lg:-bottom-12  top-0 lg:top-[90%] left-0 lg:  lg:left-10 z-10 w-50% lg:w-[87%] mx-auto py-6 px-10 bg-caribbeangreen-700 text-white flex justify-evenly"
                    }
                >
                    <div className="flex gap-10 ">
                        <div className="text-[33px] font-bold">10</div>
                        <div className={"text-caribbeangreen-400"}>
                            <div>Years</div>
                            <div>Experience</div>
                        </div>
                    </div>
                    <div className="flex gap-10 lg:border-l-2 border-caribbeangreen-400 lg:pl-[50px]">
                        <div className="text-[33px] font-bold">250</div>
                        <div className={"text-caribbeangreen-400"}>
                            <div>Types of</div>
                            <div>Courses</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeLineSection;
