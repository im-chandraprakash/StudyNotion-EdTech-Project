import React, { useState } from "react";
import ContactUsForm from "../../contactPage/ContactUsForm";

function ContactFormSection() {
    return (
        <div className="mx-auto w-full max-w-[500px] mt-16">
            <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
            <p className="text-center text-richblack-300 mt-3">
                We&apos;d love to here for you, Please fill out this form.
            </p>
            <div className="mt-12 mx-auto">
                <ContactUsForm />
            </div>
        </div>
    );
}

export default ContactFormSection;
