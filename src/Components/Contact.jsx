import { useTranslation } from 'react-i18next';
import { useForm, ValidationError } from '@formspree/react';
import { useState, useRef } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { motion, useInView } from 'framer-motion';

const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

const Contact = () => {
    const { t } = useTranslation();

    const [state, handleSubmit] = useForm("xldnydla");
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef(null);

    const infoRef = useRef(null);
    const formRef = useRef(null);

    const infoInView = useInView(infoRef, { once: true, margin: "-100px" });
    const formInView = useInView(formRef, { once: true, margin: "-100px" });

    const onCaptchaVerify = (token) => setCaptchaToken(token);
    const onCaptchaExpire = () => setCaptchaToken(null);

    const customSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            alert(t("contact.alert"));
            return;
        }
        await handleSubmit(e);
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[50vh] bg-main md:bg-gradient-to-r md:from-main md:from-20% md:via-lighter-main md:via-50% md:to-light md:to-100%">

            {/* Contact Info */}
            <motion.div
                ref={infoRef}
                variants={fadeIn}
                initial="hidden"
                animate={infoInView ? "visible" : "hidden"}
                className="w-full md:w-1/2 bg-left p-6 flex flex-col justify-center items-center"
            >
                <h2 className="text-4xl md:text-6xl font-light italic text-white text-center font-headers">
                    {t("contact.title")}
                </h2>
                <div className="mt-6 flex flex-col items-center gap-2">
                    <a
                        href="mailto:info@sda.co"
                        className="text-white spacing text-center font-regular text-2xl hover:text-ambergold transition-colors duration-500 cursor-pointer"
                    >
                        info@kzg.net.pl
                    </a>
                    <a
                        href="tel:312312412"
                        className="text-white spacing text-center font-regular text-2xl hover:text-ambergold transition-colors duration-500 cursor-pointer"
                    >
                        22 643 00 60
                    </a>
                </div>
            </motion.div>

            {/* Email Form */}
            <motion.div
                ref={formRef}
                variants={fadeIn}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                className="w-full md:w-1/2 bg-right p-6 flex flex-col justify-center gap-10"
            >
                {!state.succeeded ? (
                    <form onSubmit={customSubmit} className="flex flex-col space-y-4">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder={t("contact.form.name")}
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
                            placeholder={t("contact.form.email")}
                            required
                            className="p-2 border rounded outline-none focus:border-ambergold text-white border-lightest"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />

                        <input
                            id="subject"
                            type="text"
                            name="subject"
                            placeholder={t("contact.form.subject")}
                            autoComplete="off"
                            required
                            className="p-2 border rounded outline-none focus:border-ambergold text-white border-lightest"
                        />
                        <ValidationError prefix="Subject" field="subject" errors={state.errors} />

                        <textarea
                            id="message"
                            name="message"
                            placeholder={t("contact.form.message")}
                            required
                            className="p-2 border rounded outline-none focus:border-ambergold text-white border-lightest resize-none"
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
                            {t("contact.form.send")}
                        </button>
                    </form>
                ) : (
                    <div className="text-ambergold text-3xl font-regular font-light">
                        {t("contact.thankyou")}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Contact;
