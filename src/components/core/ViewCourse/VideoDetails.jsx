import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import IconBtn from "../../common/IconBtn";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

import { FaPlayCircle } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import { completeLectureAPI } from "../../../services/operations/courseDetailAPI";
import { setCompletedLectures } from "../../../slices/viewCourseSlice";

function VideoDetails() {
    const playerRef = useRef();
    const location = useLocation();
    const [videoData, setVideoData] = useState();
    const [isVideEnded, setIsVideoEnded] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState();
    const { token } = useSelector((state) => state.auth);
    const { courseId, sectionId, subSectionId } = useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        const fetchFirstVideoData = () => {
            if (courseSectionData.length == 0) {
                return;
            }

            if (!courseId || !sectionId || !subSectionId) {
                navigate("/dashboard/enrolled-courses");
                return;
            } else {
                const filterSectionData = courseSectionData?.filter(
                    (data) => data._id == sectionId
                );

                const filterSubSectionData =
                    filterSectionData?.[0]?.subSection.filter(
                        (data) => data._id == subSectionId
                    );

                setVideoData(filterSubSectionData?.[0]);
                setIsVideoEnded(false);

                console.log("filtered video data : ", videoData);
            }
        };
        fetchFirstVideoData();
    }, [courseSectionData, courseEntireData, location.pathname]);

    const isFirstVideo = () => {
        const sectionDataIndex = courseSectionData?.findIndex(
            (section) => section._id == sectionId
        );

        const subSectionDataIndex = courseSectionData[
            sectionDataIndex
        ]?.subSection.findIndex((subSection) => subSection._id == subSectionId);

        // console.log("indexes : ", sectionDataIndex, subSectionDataIndex);

        if (sectionDataIndex == 0 && subSectionDataIndex == 0) {
            return true;
        } else {
            return false;
        }
    };

    const isLastVideo = () => {
        const currSectionIndex = courseSectionData?.findIndex(
            (section) => section._id == sectionId
        );

        const lengthOfSection = courseSectionData.length;
        const lengthOfSubSection =
            courseSectionData[currSectionIndex]?.subSection.length;

        const currSubSectionIndex = courseSectionData[
            currSectionIndex
        ]?.subSection.findIndex((subSection) => subSection._id == subSectionId);

        if (
            currSectionIndex == lengthOfSection - 1 &&
            currSubSectionIndex == lengthOfSubSection - 1
        ) {
            return true;
        } else {
            return false;
        }
    };

    const goToNextVideo = () => {
        const currSectionIndex = courseSectionData?.findIndex(
            (section) => section._id == sectionId
        );

        const sectionLength = courseSectionData?.length;
        const subSectionLength =
            courseSectionData[currSectionIndex]?.subSection.length;

        const currSubSectionIndex = courseSectionData[
            currSectionIndex
        ]?.subSection.findIndex((subSection) => subSection._id == subSectionId);

        if (currSubSectionIndex != subSectionLength - 1) {
            const nextSubSectionId =
                courseSectionData[currSectionIndex]?.subSection[
                    currSubSectionIndex + 1
                ]._id;

            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
            );
        } else {
            const nextSectionId = courseSectionData[currSectionIndex + 1]._id;
            const nextSubSectionId =
                courseSectionData[currSectionIndex + 1]?.subSection[0]._id;

            navigate(
                `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
            );
        }
    };

    const goToPrevVideo = () => {
        const currSectionIndex = courseSectionData.findIndex(
            (section) => section._id == sectionId
        );

        const currSubSectionIndex = courseSectionData[
            currSectionIndex
        ]?.subSection.findIndex((subSection) => subSection._id == subSectionId);

        if (currSubSectionIndex != 0) {
            const prevSubSectionId =
                courseSectionData[currSectionIndex]?.subSection[
                    currSubSectionIndex - 1
                ]._id;

            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            );
        } else {
            const prevSectionId = courseSectionData[currSectionIndex - 1]._id;

            const subSectionLength =
                courseSectionData[currSectionIndex - 1]?.subSection.length;
            const prevSubSectionId =
                courseSectionData[currSectionIndex - 1]?.subSection[
                    subSectionLength - 1
                ]._id;

            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            );
        }
    };

    const handleLectureCompletion = async () => {
        setLoading(true);

        const sectionIndex = courseSectionData?.findIndex(
            (section) => section._id === sectionId
        );

        console.log("index is : ", courseSectionData[sectionIndex]?.subSection);
        const result = await completeLectureAPI(token, {
            courseId,
            subSectionId,
        });

        // console.log("handle lecture complete " , result);
        // if (result) {

        //     // completedLectures.push(subSectionId);
        //     // dispatch(setCompletedLectures(completedLectures));
        // }

        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-5 text-white">
            {!videoData ? (
                <div></div>
            ) : (
                <div>
                    <Player
                        ref={playerRef}
                        playsInline
                        src={videoData?.videoUrl}
                        aspectratio="16:9"
                        onEnded={() => setIsVideoEnded(true)}
                    >
                        <FaPlayCircle />

                        {isVideEnded && (
                            <div
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                }}
                                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                            >
                                {!completedLectures.includes(subSectionId) && (
                                    <div>
                                        <IconBtn
                                            text={"Mark As Completed"}
                                            onclick={handleLectureCompletion}
                                            customClasses="text-xl max-w-max px-4 mx-auto"
                                        ></IconBtn>
                                    </div>
                                )}

                                <IconBtn
                                    text={"Rewatch"}
                                    onclick={() => {
                                        if (playerRef?.current) {
                                            playerRef.current.seek(0);
                                            setIsVideoEnded(false);
                                        }
                                    }}
                                    customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                                />

                                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                    {!isFirstVideo() && (
                                        <button
                                            disabled={loading}
                                            onClick={() => goToPrevVideo()}
                                            className="blackButton"
                                        >
                                            Prev
                                        </button>
                                    )}

                                    {!isLastVideo() && (
                                        <button
                                            disabled={loading}
                                            onClick={() => goToNextVideo()}
                                            className="blackButton"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </Player>

                    <h1 className="mt-4 text-3xl font-semibold">
                        {videoData?.title}
                    </h1>
                    <p className="pt-2 pb-6">{videoData?.description}</p>
                </div>
            )}
        </div>
    );
}

export default VideoDetails;
