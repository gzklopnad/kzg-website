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
    const [submitted,setSubmitted] = useState(false);
    if (state.succeeded) {
        return <p className="text-green-500">Thanks for reaching out!</p>;
    }

    return (
        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-10 px-4 py-10">

            {/* "Contact us" sign */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white text-center">
                    Contact Us
                </h2>

                {/* Contact details */}
                <div className="mt-6 flex flex-col items-center gap-2">
                    <a href="mailto:info@sda.co" className="text-white   text-center font-regular text-2xl hover:text-gold transition-colors duration-500 cursor-pointer">
                        info@sda.co
                    </a>
                    <a href="tel:312312412" className="text-white  text-center font-regular text-2xl hover:text-gold transition-colors duration-500 cursor-pointer" >
                        312 312 412
                    </a>
                </div>


            </div>
            {!state.succeeded ? (

                    //Contact us form
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full md:w-1/2">

                    {/* Name field */}
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        autoComplete="name"
                        inputMode="text"
                        aria-label="Your name"
                        required
                        className="p-2 border rounded"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />

                    {/* Email field */}
                    <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="Your email"
                        aria-label="Your email address"
                        className="p-2 border rounded"
                        required
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />

                    {/* Subject field */}
                    <input
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        autoComplete="off"
                        inputMode="text"
                        aria-label="Message subject"
                        className="p-2 border rounded"
                        required
                    />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />

                    {/* Message field */}
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Your message"
                        aria-label="Your message"
                        className="p-2 border rounded"
                        required
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} />

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={state.submitting}
                        className="bg-emerald text-white p-2 rounded hover:text-gold transition duration-500 cursor-pointer"
                    >
                        Send
                    </button>
                </form>
            ) : (
                <div className="text-green-500 text-xl md:w-1/2">Thank you! Your message has been sent.</div>
            )}

        </div>
    );
};

export default Contact;