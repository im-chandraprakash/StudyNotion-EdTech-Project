import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import CourseCard from "./CourseCard";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";

// import required modules
// import { Navigation } from "swiper/modules";

function CourseSlider({ Courses, auto }) {
    console.log("slider data : ", Courses);
    return (
        <div>
            {Courses?.length > 0 ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    loop={true}
                    modules={[FreeMode, Pagination, Autoplay]}
                    autoplay={
                        auto
                            ? {
                                  delay: 2500,
                                  disableOnInteraction: false,
                              }
                            : ""
                    }
                    
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="max-h-[30rem]"
                >
                    {Courses?.map((course, i) => (
                        <SwiperSlide key={i}>
                            <CourseCard course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div>No courses Found</div>
            )}
        </div>
    );
}

export default CourseSlider;
