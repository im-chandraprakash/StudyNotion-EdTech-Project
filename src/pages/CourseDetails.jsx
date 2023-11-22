import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFullCourseDetailsAPI } from "../services/operations/courseDetailAPI";
import { useSelector } from "react-redux";
import GetAvgRating from "../utils/avgRating";
import RatingStars from "../components/common/RatingStars";

import { BsGlobe } from "react-icons/bs";

import Footer from "../components/common/Footer";
import { formatDate } from "../services/formatDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";

function CourseDetails() {
    const { courseId } = useParams();
    const [Course, setCourse] = useState();
    const { token } = useSelector((state) => state.auth);
    const [avgRating, setAvgRating] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(Array(0));
    const [isPurchased, setIsPurchased] = useState(false);

    const handleActive = (id) => {
        let activeResult = !isActive.includes(id)
            ? isActive.concat(id)
            : isActive.filter((e) => e != id);

        setIsActive(activeResult);
    };

    const fetchApi = async () => {
        setLoading(true);
        const result = await getFullCourseDetailsAPI(token, { courseId });

        console.log("course result : ", result);
        setLoading(false);
        if (result) {
            setCourse(result);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        const rating = GetAvgRating(Course?.ratingAndReviews);
        setAvgRating(rating);
    }, [Course]);

    const [totalLectures, setTotalLectures] = useState(0);

    useEffect(() => {
        let lecture = 0;
        Course?.courseContent.forEach((section) => {
            lecture += section.subSection.length || 0;
        });
        setTotalLectures(lecture);
    }, []);
    return (
        <div>
            {!loading ? (
                <div className="w-full text-white h-full">
                    <div className=" bg-richblack-800 lg:h-[450px]">
                        <div className="flex justify-center items-center  flex-col-reverse lg:flex-row w-full h-full max-w-maxContent mx-auto">
                            <div className="flex-[1.3]  w-full h-full flex flex-col justify-center items-center text-richblack-5 text-[18px]">
                                <div className="w-full flex flex-col gap-[11px] ml-[10%] lg:ml-0 px-4">
                                    <h1 className="font-bold text-[44px]">
                                        {Course?.courseName}
                                    </h1>
                                    <p className="text-[21px] text-richblack-200">
                                        {Course?.courseDescription}
                                    </p>

                                    <div className="flex gap-4 text-[20px] items-center">
                                        <p>{avgRating || 0}</p>
                                        <RatingStars
                                            Review_Count={avgRating}
                                            Star_Size={24}
                                        ></RatingStars>
                                        <p>
                                            {Course?.ratingAndReviews?.length}{" "}
                                            Ratings
                                        </p>
                                    </div>
                                    <p className="text-[18px] ">
                                        Created By -{" "}
                                        {Course?.instructor?.firstName +
                                            " " +
                                            Course?.instructor?.lastName}
                                    </p>

                                    <div className="text-[18px] flex items-center gap-3">
                                        <p>Created At -</p>
                                        {formatDate(Course?.createdAt)}{" "}
                                        <span className="flex gap-3 items-center">
                                            <BsGlobe /> <span>English</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className=" h-fit lg:mt-[100px] lg:relative  lg:flex-[0.60] mt-14">
                                <CourseDetailsCard
                                    name={Course?.courseName}
                                    description={Course?.courseDescription}
                                    price={Course?.price}
                                    image={Course?.thumbnail}
                                    instructions={Course?.instructions}
                                    course={Course}
                                />
                            </div>
                        </div>
                        <div className="bg-richblack-900">
                            <div className="w-full max-w-maxContent mx-auto text-white mt-8 flex flex-col gap-8 ">
                                <div className="w-full px-8 lg:px-0 lg:w-[65%]">
                                    {Course?.whatYouWillLearn && (
                                        <div className="border-[1px] border-richblack-500 p-9 ">
                                            <h1 className="text-3xl font-bold">
                                                What You'll Learn
                                            </h1>
                                            <p className="text-[18px] text-richblack-300 mt-4">
                                                {Course?.whatYouWillLearn}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="px-10 lg:px-0 lg:w-[65%]">
                                    {/* course Content section */}
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[31px] font-semibold">
                                            Course Content
                                        </p>
                                        <div className="flex text-[17px]  flex-wrap justify-between gap-2">
                                            <div className="flex gap-2">
                                                <span>
                                                    {
                                                        Course?.courseContent
                                                            .length
                                                    }{" "}
                                                    {`section(s)`}
                                                </span>
                                                <span>
                                                    {totalLectures}{" "}
                                                    {`lecture(s)`}
                                                </span>
                                            </div>
                                            <div>
                                                <button
                                                    className="text-yellow-25"
                                                    onClick={() =>
                                                        setIsActive([])
                                                    }
                                                >
                                                    Collapse all sections
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        {Course?.courseContent?.map(
                                            (section, index) => (
                                                <CourseAccordionBar
                                                    course={section}
                                                    isActive={isActive}
                                                    handleActive={handleActive}
                                                    key={index}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="w-full px-12 lg:px-0 lg:w-[80%] mb-10">
                                    <h1 className="text-2xl font-bold">
                                        Author
                                    </h1>

                                    <div className="flex gap-6 items-center mt-5">
                                        <div className="w-[60px] h-[60px]">
                                            <img
                                                src={Course?.instructor?.image}
                                                alt={
                                                    Course?.instructor
                                                        ?.firstName
                                                }
                                                className="w-full h-full rounded-full"
                                            />
                                        </div>

                                        <p className="text-[19px]">
                                            {Course?.instructor?.firstName +
                                                " " +
                                                Course?.instructor?.lastName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <Footer />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-4xl text-white">Loading ...</div>
            )}
        </div>
    );
}

export default CourseDetails;
