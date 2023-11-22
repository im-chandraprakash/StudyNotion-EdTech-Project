import React from "react";
import HighlightText from "../HomePage/HighlightText";
import Button from "../HomePage/Button";

function LearningGrid() {
    return (
        <div>
            <div
                className={
                    " flex flex-col sm:space-y-6 lg:space-y-0 lg:grid lg:grid-rows-2 lg:grid-cols-4 "
                }
            >
                <div className="col-span-2 flex flex-col gap-5 lg:w-[85%] ">
                    <h1 className="text-[35px] font-bold leading-10">
                        World-Class Learning for{" "}
                        <HighlightText text={" Anyone, Anywhere"} />
                    </h1>
                    <p className="text-[18px] text-richblack-300">
                        Studynotion partners with more than 275+ leading
                        universities and companies to bring flexible,
                        affordable, job-relevant online learning to individuals
                        and organizations worldwide.
                    </p>

                    <div className="w-fit">
                        <Button active={true}>Learn more</Button>
                    </div>

                    <div className="h-[20px] lg:hidden"></div>
                </div>

                <div className="flex flex-col gap-8 justify-center p-8 pb-20   bg-richblack-700">
                    <p className="text-[19px]">
                        Curriculum Based on Industry Needs
                    </p>
                    <p className="text-[16px] text-richblack-200 ">
                        Save time and money! The Belajar curriculum is made to
                        be easier to understand and in line with industry needs.
                    </p>
                </div>
                <div className="flex flex-col gap-8 justify-center p-8 pb-20   bg-richblack-800">
                    <p className="text-[19px]">Our Learning Methods</p>
                    <p className="text-[16px] text-richblack-200 ">
                        Studynotion partners with more than 275+ leading
                        universities and companies to bring
                    </p>
                </div>
                <div className="col-span-1"></div>
                <div className="flex flex-col gap-8 justify-center p-8 pb-20  bg-richblack-700">
                    <p className="text-[19px]">Certification</p>
                    <p className="text-[16px] text-richblack-200 ">
                        Studynotion partners with more than 275+ leading
                        universities and companies to bring
                    </p>
                </div>
                <div className="flex flex-col gap-8 justify-center p-8 pb-20   bg-richblack-800">
                    <p className="text-[19px]">Rating "Auto-grading"</p>
                    <p className="text-[16px] text-richblack-200 ">
                        Studynotion partners with more than 275+ leading
                        universities and companies to bring
                    </p>
                </div>
                <div className="flex flex-col gap-8 justify-center p-8 pb-20   bg-richblack-700">
                    <p className="text-[19px]">Ready to Work</p>
                    <p className="text-[16px] text-richblack-200 ">
                        Studynotion partners with more than 275+ leading
                        universities and companies to bring
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LearningGrid;
