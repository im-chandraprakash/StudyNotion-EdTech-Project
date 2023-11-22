import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import aboutImg1 from "../assets/Images/aboutus1.webp";
import aboutImg2 from "../assets/Images/aboutus2.0a1cd797ce3a69e81830.webp";
import aboutImg3 from "../assets/Images/aboutus3.f5cfba861877ea03735d.webp";
import Quote from "../components/core/AboutPage/Quote";
import foundingStoryImg from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import Footer from "../components/common/Footer";
import ContactUsForm from "../components/contactPage/ContactUsForm";
import ContactForm from "../components/contactPage/ContactForm";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import ReviewSlider from "../components/common/ReviewSlider";

function About() {
    return (
        <div>
            <div className="w-full bg-richblack-700 h-[500px]"></div>
            <div
                className={
                    "max-w-maxContent mx-auto w-11/12 text-white -mt-[500px]"
                }
            >
                <div className="text-center flex flex-col items-center justify-center w-full mt-20">
                    <div className="max-w-[800px]">
                        <div
                            className={
                                "text-4xl font-bold text-center leading-[40px]"
                            }
                        >
                            Driving Innovation in Online Education for a{" "}
                            <HighlightText text={"Brighter Future"} />
                        </div>
                        <p className="font-md text-[17px] text-richblack-100 mt-6">
                            Studynotion is at the forefront of driving
                            innovation in online education. We're passionate
                            about creating a brighter future by offering
                            cutting-edge courses, leveraging emerging
                            technologies, and nurturing a vibrant learning
                            community.
                        </p>
                    </div>
                </div>

                <div className="flex gap-x-8 mt-12 w-[95%] mx-auto">
                    <div className="">
                        <img src={aboutImg1} alt="about image 1" />
                    </div>
                    <div>
                        <img src={aboutImg2} alt="about image 1" />
                    </div>
                    <div>
                        <img src={aboutImg3} alt="about image 1" />
                    </div>
                </div>
            </div>
            <div className="border-b-[1px] border-richblack-200 text-white py-20">
                <div className="w-11/12 max-w-maxContent mx-auto">
                    <Quote />
                </div>
            </div>

            <div className="w-11/12 max-w-maxContent mx-auto text-richblack-100 mt-5">
                <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                    <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                        <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                            Our Founding Story
                        </h1>
                        <p className="text-[17px] font-medium text-richblack-300 lg:w-[95%]">
                            Our e-learning platform was born out of a shared
                            vision and passion for transforming education. It
                            all began with a group of educators, technologists,
                            and lifelong learners who recognized the need for
                            accessible, flexible, and high-quality learning
                            opportunities in a rapidly evolving digital world.
                        </p>
                        <p className="text-[17px]font-medium text-richblack-300 lg:w-[95%]">
                            As experienced educators ourselves, we witnessed
                            firsthand the limitations and challenges of
                            traditional education systems. We believed that
                            education should not be confined to the walls of a
                            classroom or restricted by geographical boundaries.
                            We envisioned a platform that could bridge these
                            gaps and empower individuals from all walks of life
                            to unlock their full potential.
                        </p>
                    </div>

                    <div>
                        <img
                            src={foundingStoryImg}
                            alt=""
                            className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                        />
                    </div>
                </div>

                <div className="flex flex-col  lg:flex-row justify-between space-y-20 text-richblack-200 my-14">
                    <div className="lg:w-[40%]">
                        <h1 className="text-[35px] bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold ">
                            Our Vision
                        </h1>
                        <p className="text-[17px] mt-5">
                            With this vision in mind, we set out on a journey to
                            create an e-learning platform that would
                            revolutionize the way people learn. Our team of
                            dedicated experts worked tirelessly to develop a
                            robust and intuitive platform that combines
                            cutting-edge technology with engaging content,
                            fostering a dynamic and interactive learning
                            experience.
                        </p>
                    </div>
                    <div className="lg:w-[40%]">
                        <h1 className="text-[35px]">
                            {" "}
                            <HighlightText text={"Our Mission"} />
                        </h1>
                        <p className="text-[17px] mt-5">
                            Our mission goes beyond just delivering courses
                            online. We wanted to create a vibrant community of
                            learners, where individuals can connect,
                            collaborate, and learn from one another. We believe
                            that knowledge thrives in an environment of sharing
                            and dialogue, and we foster this spirit of
                            collaboration through forums, live sessions, and
                            networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
            <Stats />

            <div>
                <div className="w-11/12 mx-auto max-w-maxContent text-white my-40">
                    <LearningGrid />

                    <div>
                        <h1 className="text-[40px] mt-12 font-bold text-center">Reviews from other learners</h1>
                        <ReviewSlider />
                    </div>
                    <ContactFormSection />
                </div>
            </div>

            <Footer />
        </div>
    );
}
export default About;
