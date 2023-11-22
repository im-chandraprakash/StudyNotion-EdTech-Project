import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

function VideoDetailsSidebar({ setReviewCourseModal }) {
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures,
    } = useSelector((state) => state.viewCourse);

    const { sectionId, subSectionId } = useParams();

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();

    console.log("check property : ", completedLectures);

    useEffect(() => {
        setActiveStatus(sectionId);
        setVideoBarActive(subSectionId);
    }, [sectionId, subSectionId]);

    console.log("data's : ", courseSectionData, totalNoOfLectures);
    return (
        <div className="flex min-w-[315px] flex-col border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10  text-white ">
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
                <div className="flex w-full items-center justify-between ">
                    <div
                        onClick={() => {
                            navigate(`/dashboard/enrolled-courses`);
                        }}
                        className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                        title="back"
                    >
                        <IoArrowBackSharp size={30} />
                    </div>
                    <IconBtn
                        text="Add Review"
                        customClasses="ml-auto"
                        onclick={() => setReviewCourseModal(true)}
                    />
                </div>
                <div className="flex flex-col">
                    <p>{courseEntireData?.courseName}</p>
                    <p className="text-sm font-semibold text-richblack-500">
                        {completedLectures?.length} / {totalNoOfLectures}
                    </p>
                </div>
            </div>

            <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                {courseSectionData.map((section, index) => (
                    <div
                        className="mt-2 cursor-pointer text-sm text-richblack-5"
                        onClick={() => setActiveStatus(section?._id)}
                        key={index}
                    >
                        {/* Section */}
                        <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                            <div className="w-[70%] font-semibold">
                                {section?.sectionName}
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`${
                                        activeStatus === section?._id
                                            ? "rotate-0"
                                            : "rotate-180"
                                    } transition-all duration-500`}
                                >
                                    <IoIosArrowDown />
                                </span>
                            </div>
                        </div>

                        {/* Sub Sections */}
                        {activeStatus === section?._id && (
                            <div className="transition-[height] duration-500 ease-in-out">
                                {section.subSection.map((subSection, i) => (
                                    <div
                                        className={`flex gap-3  px-5 py-2 ${
                                            videoBarActive === subSection._id
                                                ? "bg-yellow-200 font-semibold text-richblack-800"
                                                : "hover:bg-richblack-900"
                                        } `}
                                        key={i}
                                        onClick={() => {
                                            navigate(
                                                `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subSection?._id}`
                                            );
                                            setVideoBarActive(subSection._id);
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={completedLectures?.includes(
                                                subSection?._id
                                            )}
                                            onChange={() => {}}
                                        />
                                        {subSection.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VideoDetailsSidebar;
