import React from "react";
import * as Icon1 from "react-icons/hi2";
import * as Icon2 from "react-icons/bi";
import * as Icon3 from "react-icons/io5";

const Details = [
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat on us",
        description: "Our friendly team is here to help.",
        details: "infos@studynotion.com",
    },
    {
        icon: "BiWorld",
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details:
            "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
        icon: "IoCall",
        heading: "Call us",
        description: "Mon - Fri From 8am to 5am",
        details: "+123 456 7869",
    },
];

function ContactDetails() {
    return (
        <div className="flex flex-col gap-12 p-8 bg-richblack-800 h-fit rounded-lg">
            {Details.map((ele, id) => {
                let Icon =
                    Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
                return (
                    <div key={id} className="text-richblack-300">
                        <div className="flex gap-3 items-center">
                            <Icon size={25} />
                            <h1 className={'text-lg font-bold text-white'}>{ele?.heading}</h1>
                        </div>
                        <p className="text-[16px]">{ele?.description}</p>
                        <p className="font-bold text-[14px]">{ele?.details}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default ContactDetails;
