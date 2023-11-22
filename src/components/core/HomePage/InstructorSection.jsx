import React from "react";
import instructorImage from "../../../assets/Images/Instructor.png";
import TGAbutton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "./HighlightText";
function InstructorSection() {
    return (
        <div>
            <div className={"flex gap-20 flex-col lg:flex-row items-center justify-center"}>
                <div className="flex-1 w-fit justify-center items-center">
                    <img
                        src={instructorImage}
                        alt="instructor Image "
                        className="shadow-white shadow-[-20px_-20px_0_0]"
                    />
                </div>
                <div className="flex-1 flex flex-col  gap-8 justify-center">
                    <div className="text-4xl font-semibold w-[40%]">
                        Become an <HighlightText text={"Instructor"} />
                    </div>
                    <div className="text-base font-bold text-richblack-50">
                        Instructors from around the world teach millions of
                        students on StudyNotion. We provide the tools and skills
                        to teach what you love.
                    </div>
                    <div className="w-fit">
                        <TGAbutton active={true}>
                            <div className="flex items-center gap-3">
                                Start Teaching Today <FaArrowRight />
                            </div>
                        </TGAbutton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorSection;
