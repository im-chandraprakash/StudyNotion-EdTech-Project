import React, { useState } from "react";
import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(
        HomePageExplore[0].courses[0].heading
    );

    function setMyCards(value) {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className="text-white w-full">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl font-bold ">
                    Unlock the <HighlightText text={"Power of Code"} />
                </h1>
                <p className="font-semibold text-richblack-100">
                    Learn to Build Anything You Can Imagine
                </p>

                <div className="hidden lg:flex mt-6  items-center border-b border-b-richblack-500  gap-2 bg-richblack-800 px-2 py-1 rounded-full">
                    {tabsName.map((element, index) => {
                        return (
                            <div
                                onClick={() => setMyCards(element)}
                                key={index}
                                className={`font-bold text-[16px] px-7 py-[7px] ${
                                    element === currentTab
                                        ? "bg-richblack-900 text-richblack-5"
                                        : "text-richblack-200"
                                } rounded-full hover:bg-richblack-900 hover:text-richblack-5`}
                            >
                                {element}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-[60px] flex flex-wrap justify-center gap-10 w-full">
                    {courses.map((ele, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={ele}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ExploreMore;
