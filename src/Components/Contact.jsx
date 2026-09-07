import { useTranslation } from 'react-i18next';
import { useForm, ValidationError } from '@formspree/react';
import { useState, useRef } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { motion, useInView } from 'motion/react';

const Contact = () => {
    const { t, i18n } = useTranslation();
    const isPl = (i18n.language || 'en').startsWith('pl');

    const [state, handleSubmit] = useForm("xldnydla");
    const [captchaToken, setCaptchaToken] = useState(null);
    const captchaRef = useRef(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-80px" });

    const onCaptchaVerify = (token) => setCaptchaToken(token);
    const onCaptchaExpire = () => setCaptchaToken(null);

    const customSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            alert(isPl ? "Proszę wypełnić weryfikację CAPTCHA" : t("contact.alert"));
            return;
        }
        await handleSubmit(e);
    };

    return (
        <section id="contact" className="w-full bg-main text-white border-t border-white/10 py-8 sm:py-16 lg:py-24">
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">

                    {/* Left Column: Operations & Routing Desk (5 cols) */}
                    <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                        <div className="space-y-4">
                            <div className="text-xs font-headers font-bold uppercase tracking-wider text-slate-300">
                                {isPl ? 'OPERACJE I DYSPOZYCJA' : 'OPERATIONS & DISPATCH'}
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headers font-bold tracking-tight text-white leading-tight">
                                {isPl ? 'Zapytania Bezpośrednie i Wyceny' : 'Direct Inquiries & Rate Quotes'}
                            </h2>
                            <p className="text-base font-regular text-slate-300 font-light leading-relaxed">
                                {isPl
                                    ? 'Skontaktuj się z nami w sprawach wycen transportowych oraz dostaw metali i żużlu.'
                                    : 'Contact us for rate quotes, raw material sourcing, and freight logistics.'
                                }
                            </p>
                        </div>

                        {/* Contact Details Stack (Icon-Free Typography) */}
                        <div className="border-t border-white/15 pt-6 space-y-5 font-regular">
                            {/* Phone */}
                            <div className="space-y-1">
                                <div className="text-[10px] font-headers font-bold uppercase tracking-widest text-slate-400">
                                    {isPl ? 'TELEFON' : 'PHONE'}
                                </div>
                                <div>
                                    <a
                                        href="tel:+48226430060"
                                        className="text-base sm:text-lg font-headers font-bold tracking-tight text-white hover:text-ambergold transition-colors duration-200"
                                    >
                                        +48 22 643 00 60
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <div className="text-[10px] font-headers font-bold uppercase tracking-widest text-slate-400">
                                    {isPl ? 'E-MAIL' : 'EMAIL'}
                                </div>
                                <div>
                                    <a
                                        href="mailto:info@kzg.net.pl"
                                        className="text-base sm:text-lg font-headers font-bold tracking-tight text-white hover:text-ambergold transition-colors duration-200"
                                    >
                                        info@kzg.net.pl
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Clean B2B Contact Form (7 cols) */}
                    <div className="lg:col-span-7 bg-lighter-main/40 border border-white/10 p-5 sm:p-10 lg:p-12 shadow-xl">
                        {!state.succeeded ? (
                            <form onSubmit={customSubmit} className="space-y-4 sm:space-y-5">

                                {/* Form Fields Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="block text-xs font-headers uppercase tracking-wider text-slate-300 font-bold">
                                            {isPl ? 'Imię i Nazwisko *' : 'Full Name *'}
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder={isPl ? "Twoje imię" : "Your name"}
                                            className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-3 py-2.5 min-h-[44px] text-base sm:text-sm focus:border-ambergold focus-visible:ring-2 focus-visible:ring-ambergold focus-visible:outline-none transition-colors font-regular"
                                        />
                                        <ValidationError prefix="Name" field="name" errors={state.errors} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="block text-xs font-headers uppercase tracking-wider text-slate-300 font-bold">
                                            {isPl ? 'E-mail Służbowy *' : 'Corporate Email *'}
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            placeholder={isPl ? "Twój e-mail" : "Your email"}
                                            className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-3 py-2.5 min-h-[44px] text-base sm:text-sm focus:border-ambergold focus-visible:ring-2 focus-visible:ring-ambergold focus-visible:outline-none transition-colors font-regular"
                                        />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="company" className="block text-xs font-headers uppercase tracking-wider text-slate-300 font-bold">
                                            {isPl ? 'Nazwa Firmy *' : 'Company Name *'}
                                        </label>
                                        <input
                                            id="company"
                                            type="text"
                                            name="company"
                                            required
                                            placeholder={isPl ? "Nazwa firmy" : "Company name"}
                                            className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-3 py-2.5 min-h-[44px] text-base sm:text-sm focus:border-ambergold focus-visible:ring-2 focus-visible:ring-ambergold focus-visible:outline-none transition-colors font-regular"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="block text-xs font-headers uppercase tracking-wider text-slate-300 font-bold">
                                            {isPl ? 'Numer Telefonu' : 'Phone Number'}
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            placeholder={isPl ? "Numer telefonu" : "Phone number"}
                                            className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-3 py-2.5 min-h-[44px] text-base sm:text-sm focus:border-ambergold focus-visible:ring-2 focus-visible:ring-ambergold focus-visible:outline-none transition-colors font-regular"
                                        />
                                    </div>
                                </div>

                                {/* Textarea for Message */}
                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="block text-xs font-headers uppercase tracking-wider text-slate-300 font-bold">
                                        {isPl ? 'Wiadomość *' : 'Message *'}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        placeholder={isPl ? "Twoja wiadomość..." : "Your message..."}
                                        className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-3 py-2.5 text-base sm:text-sm focus:border-ambergold focus-visible:ring-2 focus-visible:ring-ambergold focus-visible:outline-none transition-colors resize-none font-regular"
                                    />
                                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                                </div>

                                {/* Captcha & Action Button */}
                                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <HCaptcha
                                        sitekey="b15ae194-734c-410a-8572-68ac81d6c70a"
                                        onVerify={onCaptchaVerify}
                                        onExpire={onCaptchaExpire}
                                        ref={captchaRef}
                                    />

                                    <button
                                        type="submit"
                                        disabled={state.submitting || !captchaToken}
                                        className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] inline-flex items-center justify-center bg-white text-slate-950 font-headers font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                    >
                                        {isPl ? 'Wyślij wiadomość' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-8 border border-ambergold/40 bg-main/90 text-ambergold space-y-3 font-regular">
                                <div className="text-xl font-headers font-bold uppercase tracking-wider">
                                    {isPl ? 'Dziękujemy! Wiadomość Została Wysłana' : 'Thank You! Message Sent'}
                                </div>
                                <p className="text-sm text-slate-300">
                                    {isPl
                                        ? 'Twoja wiadomość została dostarczona do naszego zespołu. Skontaktujemy się z Tobą najszybciej jak to możliwe.'
                                        : 'Your message has been delivered to our team. We will get back to you as soon as possible.'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Bottom Strip */}
                <div className="border-t border-white/10 mt-12 sm:mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400 font-regular">
                    <div>
                        © {new Date().getFullYear()} KZG POLAND. {isPl ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'}
                    </div>
                    <div className="flex items-center gap-2.5">
                        <span className="text-slate-300">Designed & Built by</span>
                        <span className="inline-flex items-center text-white hover:text-ambergold transition-colors">
                            <svg
                                className="h-5.5 sm:h-6 w-auto fill-current inline-block"
                                viewBox="0 0 3004 1408"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M2428 303.7c-52.5 3.6-93.7 12.6-139 30.5-100.1 39.6-183.4 121.3-224.3 219.8-38.8 93.6-46.8 197.5-22.7 295.6 15.3 62.3 42.6 117.6 82.9 168.2 11.2 14.1 40.4 43.3 56.3 56.4 87.3 71.9 204.4 105.2 316.8 90.2 55.1-7.3 114.5-26.2 160.5-51.1 22.8-12.3 45.7-28.1 58.5-40.4 3-2.9 8.9-8.4 13-12.2 18.5-17.2 50.9-50 57.9-58.7 46.3-57.1 73.8-124.3 84-205 4-31.2 4.9-58.2 3-86.6-3.7-56.6-15.8-109.7-35.1-154.9-28.8-67.1-67.3-118.3-121.6-161.7-58.2-46.5-132.4-77.5-208.7-87.2-23.9-3-60.8-4.4-81.5-2.9m49.5 65.3c64.3 4.4 121.9 25 175.4 62.8 56.4 39.9 101.2 101.2 125.4 171.7 26.3 76.9 28.3 170.4 5.2 249.9-19.9 68.7-54.6 121.9-109.5 168-11.9 10-44.2 31.9-57.6 39-29.6 15.8-78.6 32.3-114.6 38.5-32.4 5.6-79.8 6.6-108.3 2.3-23.7-3.7-49.3-10.3-72.5-18.8-10.5-3.9-41.4-18.8-47.2-22.7-2-1.4-3.9-2.3-4.2-1.9-.3.3-.6 0-.6-.7s-.4-1-.9-.7-1.2-.1-1.5-1c-.3-.8-1-1.2-1.6-.9-.5.3-1 .1-1-.4 0-.6-.7-1.1-1.5-1.1s-1.5-.5-1.5-1c0-.6-.7-1-1.5-1s-1.5-.5-1.5-1c0-.6-.4-.9-.9-.8-.5.2-1.7-.6-2.6-1.7s-1.3-1.4-.9-.6c.8 1.7-13.3-8.9-22-16.3-8.2-7.1-33-33.6-42.8-45.9-28.1-34.9-47.6-69.9-61.2-109.5-10.6-31-17.3-61.5-21.3-96.5-2.1-18.6-2.3-62.9-.4-82.2 4.6-47.4 17.5-94.7 36.5-133.8 18.7-38.5 39-67 68.2-95.9 21.8-21.6 39.4-35.6 62-49.4 41.1-25.2 93.4-42.9 140.4-47.3 23.3-2.2 42.5-2.5 64.5-1.1M1306 324.1c-49 .7-57.8 1.3-88.4 6.5-111.2 18.7-202.2 79.5-259.1 172.9-13.8 22.8-27 52-36.8 82-6.7 20.5-9.3 30.7-14.6 57-5.1 25.5-7.5 44.9-10.6 85.6-4.3 56.8-9.5 89.1-20 125.2-15.3 52.3-40.7 95.9-76.9 132.3-23.7 23.7-58.5 48.1-88.6 62.2-38.1 17.8-76.9 29-123 35.4-6.1.8-50.4 1.2-156.2 1.5l-147.8.4V387h135.8c78.9 0 143 .5 153.1 1 59.7 3.5 110.6 18.3 159.7 46.6 38.1 21.9 75.6 56.8 99.1 92.2 7.8 11.9 20.2 36.4 26.4 52.4 2.9 7.6 5.4 13.6 5.6 13.4s2.6-8.6 5.2-18.7c8.5-31.7 18-56.2 29.2-75l2.2-3.7-6.4-8.3c-39.2-51.6-83.2-88.5-138.6-116.3-45.1-22.5-92.9-36.8-147.3-43.8-16.3-2.2-19-2.2-208.2-2.5l-191.8-.4V1148h173.3c99.8 0 180.4-.4 190.2-1 46.4-2.7 82.7-9.5 125-23.4 85-28.1 152.4-77 200-145.1 19.4-27.8 38.1-66.3 48-99 13.9-45.7 21-88.6 25.5-153.3 4.4-63.4 10.8-94.2 29.7-142.2 8.8-22.5 17.6-39.2 31.4-60 18.4-27.6 36.7-48.3 57.6-65.1 56.4-45.3 116.7-67.3 194.7-70.9 10.5-.5 72.3-.9 137.4-1H1539l-.2-31.5-.3-31.5-93-.3c-51.1-.1-113.9.1-139.5.4" />
                                <path d="M1651 736v412h269c148 0 269-.3 269-.8 0-.4-3.3-2.5-7.2-4.7-20.4-11.3-47-31-63.9-47.2l-10.6-10.3H1727V324h-76zm-442-38.3c-72.8 3.8-132.1 25.5-178 65-51.7 44.6-73.7 105.1-64.4 177.3 5.7 44.1 27.7 84.1 63.6 116 51.7 45.9 125.2 77.3 203.8 86.9 34.7 4.3 37.7 4.4 178.8 4.8l137.2.4V1085h-133.2c-81.1 0-138-.4-145.3-1-39.1-3.3-73.9-11.2-106.3-24.1-43.4-17.3-81.1-45.7-101.6-76.4-11.2-16.8-19.3-36.3-22.1-53.5-2-12.6-2-36 .1-48.1 1.7-10 6.9-26 11.1-34.3 15.7-31.3 44-55.5 82.8-70.9 12-4.8 32.1-10.2 48-12.9 12.9-2.2 13.9-2.2 146.3-2.5l133.2-.4V697l-124.2.2c-68.4.1-126.8.3-129.8.5" />
                            </svg>
                        </span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
