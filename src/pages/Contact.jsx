import React from "react";
import ContactDetails from "../components/contactPage/ContactDetails";
import ContactForm from "../components/contactPage/ContactForm";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

function Contact() {
    return (
        <div>
            <div className="w-11/12 max-w-maxContent mx-auto text-white my-20 mb-40">
                <div className="flex lg:flex-row gap-10 flex-col">
                    <div className="">
                        <ContactDetails />
                    </div>
                    <div className="grid place-items-center">
                        <div className="w-[85%]">
                            <ContactForm />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-[40px] mt-20 font-bold text-center">
                        Reviews from other learners
                    </h1>
                    <ReviewSlider />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
