import React from "react";
import HighlightText from "./HighlightText";

import knowYourProgress from "../../../assets/Images/Know_your_progress.svg";
import compareWithOther from "../../../assets/Images/Compare_with_others.svg";
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png";
import TGAButton from "./Button";

function LearningLanguageSection() {
    return (
        <div className="mt-[150px] mb-[100px] w-full">
            <div className="flex flex-col gap-0 items-center">
                <div className="text-[40px] font-bold">
                    Your swiss knife for{" "}
                    <HighlightText text={"learning any language"} />
                </div>
                <div className="max-w-[800px]  text-center leading-7 text-richblack-600 lg:w-[75%] mx-auto  text-base mt-3 mb-8 lg:mb-0">
                    Using spin making learning multiple languages easy. with 20+
                    languages realistic voice-over, progress tracking, custom
                    schedule and more.
                </div>

                <div className="w-[100%] image">
                    <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-8 w-[100%] object-cover ">
                        <div className="w-[450px] lg:w-full -mr-40">
                            <img
                                src={knowYourProgress}
                                alt="knowYourProgressImage"
                                className="image  w-full"
                            />
                        </div>
                        <div className="w-[500px] lg:w-full">
                            <img
                                src={compareWithOther}
                                alt="knowYourProgressImage"
                                className="image w-full "
                            />
                        </div>
                        <div className="w-[500px] lg:w-full lg:-ml-44">
                            <img
                                src={planYourLesson}
                                alt="knowYourProgressImage"
                                className="image w-full  "
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <TGAButton active={true}>Learn more</TGAButton>
                </div>
            </div>
        </div>
    );
}

export default LearningLanguageSection;
