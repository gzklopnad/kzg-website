import { useTranslation } from 'react-i18next';
import { useForm, ValidationError } from '@formspree/react';
import {useState} from "react";
const Contact = () => {

    // i18n translation
    const {t, i18n} = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    //formspree state handler for email submission
    const [state, handleSubmit] = useForm("xldnydla");
    return (
        <div className="flex flex-col md:flex-row w-full h-[30vh] md:h-[50vh] bg-gradient-to-r from-main from-20% via-lighter-main via-50% to-light to-100%  ">

            {/* Contact us */}
            <div className="w-full md:w-1/2 bg-left p-6 flex flex-col justify-center items-center bg-transparent">
                <h2 className="text-4xl md:text-6xl font-bold text-white text-center">
                    Contact Us
                </h2>

                <div className="mt-6 flex flex-col items-center gap-2">
                    <a
                        href="mailto:info@sda.co"
                        className="text-white spacing text-center font-regular text-2xl hover:text-gold transition-colors duration-500 cursor-pointer"
                    >
                        info@sda.co
                    </a>
                    <a
                        href="tel:312312412"
                        className="text-white spacing text-center font-regular text-2xl hover:text-ambergold transition-colors duration-500 cursor-pointer"
                    >
                        312 312 412
                    </a>
                </div>
            </div>

            {/* Email form */}
            <div className="w-full md:w-1/2 bg-right p-6 flex flex-col justify-center bg-transparent">
                {!state.succeeded ? (
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            autoComplete="name"
                            required
                            className="p-2 border rounded"
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} />

                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Your email"
                            required
                            className="p-2 border rounded"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />

                        <input
                            id="subject"
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            autoComplete="off"
                            required
                            className="p-2 border rounded"
                        />
                        <ValidationError prefix="Subject" field="subject" errors={state.errors} />

                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your message"
                            required
                            className="p-2 border rounded"
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} />

                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="bg-button text-white p-2 rounded-3xl cursor-pointer border-transparent border-1 hover:text-ambergold hover:border-ambergold transition duration-500"
                        >
                            Send
                        </button>
                    </form>
                ) : (
                    <div className="text-green-500 text-xl">Thank you! Your message has been sent.</div>
                )}
            </div>
        </div>

    );
};

export default Contact;