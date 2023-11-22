import React from "react";
import { Outlet, useParams } from "react-router-dom";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { useState } from "react";
import { useEffect } from "react";
import { getFullCourseDetailsAPI } from "../services/operations/courseDetailAPI";
import { useDispatch, useSelector } from "react-redux";
import {
    setCompletedLectures,
    setCourseEntireData,
    setCourseSectionData,
    setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
function ViewCourse() {
    const [reviewCourseModal, setReviewCourseModal] = useState();
    const { token } = useSelector((state) => state.auth);
    const { courseId } = useParams();
    const dispatch = useDispatch();

    const fetchFullCourseDetails = async () => {
        let view = true;
        const result = await getFullCourseDetailsAPI(token, { courseId }, view);

        console.log("course full details : ", result);

        if (result) {
            dispatch(setCourseSectionData(result?.data?.courseContent));
            dispatch(setCourseEntireData(result?.data));
            dispatch(setCompletedLectures(result?.completedVideos));

            let totalNoOfLecture = 0;

            result?.data?.courseContent.forEach((section) => {
                totalNoOfLecture += section?.subSection.length;
            });

            console.log("total lecture ", totalNoOfLecture);
            dispatch(setTotalNoOfLectures(totalNoOfLecture));
        }
    };

    useEffect(() => {
        fetchFullCourseDetails();
    }, []);

    return (
        <>
            <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                <VideoDetailsSidebar
                    setReviewCourseModal={setReviewCourseModal}
                />
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            {reviewCourseModal && (
                <CourseReviewModal
                    setReviewCourseModal={setReviewCourseModal}
                />
            )}
        </>
    );
}

export default ViewCourse;
