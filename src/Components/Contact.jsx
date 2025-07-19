import { useTranslation } from 'react-i18next';
import { useForm, ValidationError } from '@formspree/react';
import {useState, useRef} from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
const Contact = () => {

    // i18n translation
    const {t, i18n} = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    //formspree state handler for email submission
    const [state, handleSubmit] = useForm("xldnydla");
    // Simulate form success in development
    /* const isDev = process.env.NODE_ENV === 'development';
    const showThankYou = isDev ? true : state.succeeded; */

    //captcha integration
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef(null);

    const onCaptchaVerify = (token) => {
        setCaptchaToken(token);
    };

    const onCaptchaExpire = () => {
        setCaptchaToken(null);
    };

    const customSubmit = async (e) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please complete the CAPTCHA");
            return;
        }

        await handleSubmit(e);
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-[30vh] md:h-[50vh] lg:bg-gradient-to-r from-main from-20% via-lighter-main via-50% to-light to-100%   ">

            {/* Contact us */}
            <div className="w-full md:w-1/2 bg-left p-6 flex flex-col justify-center items-center bg-transparent">
                <h2 className="text-4xl md:text-6xl font-light italic text-white text-center font-headers">
                    Contact Us
                </h2>

                <div className="mt-6 flex flex-col items-center gap-2">
                    <a
                        href="mailto:info@sda.co"
                        className="text-white spacing text-center font-regular text-2xl hover:text-ambergold transition-colors duration-500 cursor-pointer"
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
            <div className="w-full md:w-1/2 bg-right p-6 flex flex-col justify-center bg-transparent gap-10 ">
                {!state.succeeded /* showThankYou */ ? (
                    <form onSubmit={customSubmit} className="flex flex-col space-y-4">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            autoComplete="name"
                            required
                            className="p-2 border rounded outline-none focus:border-ambergold text-white border-lightest"
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} />

                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Your email"
                            required
                            className="p-2 border rounded outline-none focus:border-ambergold text-white border-lightest"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />

                        <input
                            id="subject"
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            autoComplete="off"
                            required
                            className="p-2 border rounded outline-none focus:border-ambergold text-white border-lightest"
                        />
                        <ValidationError prefix="Subject" field="subject" errors={state.errors} />

                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your message"
                            required
                            className="p-2 border rounded outline-none focus:border-ambergold text-white border-lightest resize-none  "
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} />

                        <HCaptcha
                            sitekey="b15ae194-734c-410a-8572-68ac81d6c70a"
                            onVerify={onCaptchaVerify}
                            onExpire={onCaptchaExpire}
                            ref={captchaRef}
                        />

                        <button
                            type="submit"
                            disabled={state.submitting || !captchaToken}
                            className="bg-button/40 text-white p-2 rounded-3xl cursor-pointer border-transparent border-1 hover:text-ambergold hover:border-ambergold transition duration-500"
                        >
                            Send
                        </button>
                    </form>
                ) : (
                    <div className="text-ambergold text-3xl font-regular font-light">Thank you! Your message has been sent.</div>
                )}
            </div>
        </div>

    );
};

export default Contact;