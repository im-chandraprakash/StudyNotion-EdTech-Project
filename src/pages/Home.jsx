import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import TGAButton from "../components/core/HomePage/Button";
import bannerVideo from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/HomePage/CodeBlocks";
import Button from "../components/core/HomePage/Button";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
// import { HomePageExplore } from "../data/homepage-explore";
function Home() {
    return (
        <div className="mt-10 text-white overflow-hidden">
            <div
                className={
                    "relative  mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-x-5 gap-y-7 text-white"
                }
            >
                <Link to={"/signup"}>
                    <div
                        className={
                            "px-11 py-2.5 bg-richblack-800 rounded-full border-b border-richblack-500 border-solid border-0.05 hover:transition-all hover:scale-95"
                        }
                    >
                        <div
                            className={
                                "flex gap-2 items-center text-base font-bold text-richblack-200 "
                            }
                        >
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className={"text-[38px] font-semibold text-center"}>
                    Empower Your Future with{" "}
                    <HighlightText text={"Coding Skills"} />
                </div>

                <p
                    className={
                        "text-lg font-bold max-w-6xl text-center text-richblack-100"
                    }
                >
                    With our online coding courses, you can learn at your own
                    pace, from anywhere in the world, and get access to a wealth
                    of resources, including hands-on projects, quizzes, and
                    personalized feedback from instructors.
                </p>

                <div className="flex gap-x-5 mt-5">
                    <TGAButton path={"/signup"} active={true}>
                        Learn More
                    </TGAButton>
                    <TGAButton path={"/login"} active={false}>
                        Book a Demo
                    </TGAButton>
                </div>

                <div className="mx-3 my-7 mt-12  shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video
                        muted
                        autoPlay
                        loop
                        className="shadow-[10px_-5px_50px_-5px] shadow-blue-200"
                    >
                        <source src={bannerVideo} type="video/mp4"></source>
                    </video>
                </div>

                <div className="w-[100%] mt-[110px]">
                    <div className="">
                        <CodeBlock
                            position={"lg:flex-row"}
                            heading={
                                <div className={"text-4xl font-semibold"}>
                                    Unlock your{" "}
                                    <HighlightText text={"coding potential"} />{" "}
                                    with our online courses.
                                </div>
                            }
                            subheading={
                                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                            }
                            ctaButton1={{
                                path: "/signup",
                                active: true,
                                btnText: "Try it yourself",
                            }}
                            ctaButton2={{
                                path: "/signup",
                                active: false,
                                btnText: "Learn more",
                            }}
                            codeColor={"text-yellow-25"}
                            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n <a href="/three">Three</a>\n</nav>\n</body>`}
                            backgroundGradient={
                                <div className="codeblock1 absolute"></div>
                            }
                        />
                    </div>

                    <div className="mt-[150px] mb-[60px]">
                        <CodeBlock
                            // position={"flex flex-row-reverse"}
                            position={"lg:flex-row-reverse"}
                            heading={
                                <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                    Start
                                    <HighlightText
                                        text={" coding in seconds"}
                                    />
                                </div>
                            }
                            subheading={
                                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                            }
                            ctaButton1={{
                                path: "/signup",
                                active: true,
                                btnText: "Try it yourself",
                            }}
                            ctaButton2={{
                                path: "/signup",
                                active: false,
                                btnText: "Learn more",
                            }}
                            codeColor={"text-white"}
                            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                            backgroundGradient={
                                <div className="codeblock2 absolute"></div>
                            }
                        />
                    </div>

                    <div className={"translate-y-[100px] w-full"}>
                        <ExploreMore />

                        {/* hello */}
                    </div>
                </div>
            </div>

            {/* section-2 */}
            <div className="bg-pure-greys-5 text-richblack-700 overflow-hidden w-full">
                <div className={"background_bg h-[320px] flex items-center w-full "}>
                    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center">
                        <div className="flex gap-x-5 items-center p-3 md:p-12 mt-[110px] justify-center">
                            <TGAButton path={"/signup"} active={true}>
                                <div className="flex items-center gap-4 w-full">
                                    Explore Full Catelog <FaArrowRight />
                                </div>
                            </TGAButton>
                            <TGAButton path={"/signup"} active={false}>
                                Learn more
                            </TGAButton>
                        </div>
                    </div>
                </div>

                <div className="w-11/12 max-w-maxContent mx-auto ">
                    <div className="flex flex-col lg:flex-row gap-x-20 gap-y-10 mt-[80px]">
                        <div className={"flex-[1.1] text-4xl font-bold"}>
                            Get the skills you need for a{" "}
                            <HighlightText text={"job that is in demand"} />
                        </div>
                        <div className={"flex-1 flex flex-col gap-y-7"}>
                            <div className="text-[17px]">
                                The modern StudyNotion is the dictates its own
                                terms. Today, to be a competitive specialist
                                requires more than professional skills.
                            </div>
                            <div className={"flex items-start"}>
                                <TGAButton path={"/signup"} active={false}>
                                    Learn more
                                </TGAButton>
                            </div>
                        </div>
                    </div>

                    <div className="mt-[100px]">
                        <TimeLineSection />
                    </div>
                    <div className="w-full">
                        <LearningLanguageSection />
                    </div>
                </div>

                {/* section - 3 */}
                <div className="bg-richblack-900 py-20 text-white">
                    <div className="w-11/12 max-w-maxContent mx-auto ">
                        <div className="w-full">
                            <InstructorSection />
                        </div>

                        <h1 className="text-center mt-16 text-4xl font-bold">
                            {" "}
                            Reviews from other learners{" "}
                        </h1>

                        <div>
                            <ReviewSlider />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>

            {/* section 1 */}

            {/* section 2 */}

            {/* section 3 */}
        </div>
    );
}

export default Home;
