import React from "react";
import TGAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
function CodeBlock({
    position,
    heading,
    subheading,
    ctaButton1,
    ctaButton2,
    codeblock,
    codeColor,
    backgroundGradient,
}) {
    return (
        <div
            className={`${position}  flex  justify-between flex-col lg:gap-10 gap-10`}
        >
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8  ">
                {heading}
                <div className={"text-base font-semibold text-richblack-200 w-[85%] -mt-3"}>
                    {subheading}
                </div>
                <div className="flex gap-x-12 mt-7">
                    <TGAButton
                        path={ctaButton1.path}
                        active={ctaButton1.active}
                    >
                        <div className="flex items-center gap-2">
                            {ctaButton1.btnText} <FaArrowRight />
                        </div>
                    </TGAButton>
                    <TGAButton
                        active={ctaButton2.active}
                        path={ctaButton2.path}
                    >
                        {ctaButton2.btnText}
                    </TGAButton>
                </div>
            </div>

            <div className=" h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                {backgroundGradient}
                <div className="flex flex-col w-[10%] font-inter select-none font-bold text-richblack-400 text-center">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`${codeColor} font-semibold font-mono pr-1`}>
                    <TypeAnimation
                        sequence={[codeblock, 1000, ""]}
                        cursor={true}
                        repeat={Infinity}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    );
}
export default CodeBlock;
