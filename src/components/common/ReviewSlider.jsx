import React from "react";

import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";
import { useState } from "react";
import { useEffect } from "react";
import RatingStars from "./RatingStars";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

function ReviewSlider() {
    const [reviewData, setReviewData] = useState();
    const TRUNCATE_LENGTH = 6;

    const [slidePerView, setSlidePerView] = useState(4);

    const fetchReviewData = async () => {
        const response = await apiConnector(
            "GET",
            ratingsEndpoints.REVIEWS_DETAILS_API
        );

        console.log("slider review : ", response.data?.result?.data);
        setReviewData(response.data?.result?.data);
    };

    useEffect(() => {
        fetchReviewData();
    }, []);

    return (
        <div className="mt-12">
            <Swiper
                loop={true}
                slidesPerView={slidePerView}
                spaceBetween={20}
                autoplay={{
                    delay: 1300,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {reviewData?.map((slide, index) => (
                    <SwiperSlide key={index} className="h-[180px]">
                        <div className="bg-richblack-800 p-5 flex gap-3 flex-col">
                            <div className="flex gap-5">
                                <div className="w-[35px] h-[35px] rounded-full">
                                    <img
                                        className="w-full rounded-full"
                                        src={slide?.user?.image}
                                        alt={`${
                                            slide.user.firstName +
                                            slide.user.lastName
                                        } image`}
                                    />
                                </div>
                                <div>
                                    <p className="text-[15px] font-bold">
                                        {slide.user?.firstName +
                                            " " +
                                            slide.user?.lastName}
                                    </p>
                                    <p className="text-[13px] text-richblack-400">
                                        {slide.course.courseName}
                                    </p>
                                </div>
                            </div>

                            <p>
                                {slide.reviews.split(" ").length >
                                TRUNCATE_LENGTH
                                    ? slide.reviews
                                          .split(" ")
                                          .splice(0, TRUNCATE_LENGTH)
                                          .join(" ") + "..."
                                    : slide.reviews}
                            </p>

                            <div>
                                <RatingStars Review_Count={slide.rating} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ReviewSlider;
