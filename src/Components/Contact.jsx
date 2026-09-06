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
        <section id="contact" className="w-full bg-main text-white border-t border-white/10 py-16 lg:py-24">
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                    {/* Left Column: Operations & Routing Desk (5 cols) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <div className="text-xs font-headers font-bold uppercase tracking-wider text-slate-300">
                                {isPl ? 'OPERACJE I DYSPOZYCJA' : 'OPERATIONS & DISPATCH'}
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-headers font-bold tracking-tight text-white leading-tight">
                                {isPl ? 'Zapytania Bezpośrednie i Wyceny' : 'Direct Inquiries & Rate Quotes'}
                            </h2>
                            <p className="text-base font-regular text-slate-300 font-light leading-relaxed">
                                {isPl
                                    ? 'Skontaktuj się z naszym zespołem operacyjnym w sprawach wycen transportowych oraz dostaw metali i żużlu.'
                                    : 'Contact our operational desk for rate quotes, raw material sourcing, and freight logistics.'
                                }
                            </p>
                        </div>

                        {/* Metadata Blocks */}
                        <div className="border-t border-white/15 pt-6 space-y-6 font-regular text-sm">
                            {/* Logistics & Freight Desk */}
                            <div className="space-y-1">
                                <div className="text-xs font-headers uppercase tracking-wider text-slate-300 font-bold">
                                    {isPl ? 'Dział Logistyki i Frachtu' : 'Logistics & Freight Desk'}
                                </div>
                                <div className="text-white space-x-4">
                                    <a href="tel:+48226430060" className="hover:text-ambergold transition-colors duration-200">+48 22 643 00 60</a>
                                    <a href="mailto:logistics@kzgpoland.pl" className="hover:text-ambergold transition-colors duration-200">logistics@kzgpoland.pl</a>
                                </div>
                            </div>

                            {/* Raw Materials & Slag Sales */}
                            <div className="space-y-1">
                                <div className="text-xs font-headers uppercase tracking-wider text-slate-300 font-bold">
                                    {isPl ? 'Dział Metali i Produktów Ubocznych' : 'Raw Materials & Slag Sales'}
                                </div>
                                <div className="text-white">
                                    <a href="mailto:metals@kzgpoland.pl" className="hover:text-ambergold transition-colors duration-200">metals@kzgpoland.pl</a>
                                </div>
                            </div>

                            {/* HQ & Registration */}
                            <div className="space-y-1">
                                <div className="text-xs font-headers uppercase tracking-wider text-slate-300 font-bold">
                                    {isPl ? 'Siedziba i Rejestracja' : 'HQ & Registration'}
                                </div>
                                <div className="text-xs text-slate-300 leading-relaxed font-regular">
                                    ul. Taśmowa 7, 02-677 Warszawa, Poland<br />
                                    NIP: PL5213904812 | REGON: 386829104
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Clean B2B Contact Form (7 cols) */}
                    <div className="lg:col-span-7 bg-lighter-main/40 border border-white/10 p-8 sm:p-10 lg:p-12 shadow-xl">
                        {!state.succeeded ? (
                            <form onSubmit={customSubmit} className="space-y-5">

                                {/* Form Fields Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                                            className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-4 py-3 text-sm focus:border-ambergold focus:outline-none transition-colors font-regular"
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
                                            className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-4 py-3 text-sm focus:border-ambergold focus:outline-none transition-colors font-regular"
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
                                            className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-4 py-3 text-sm focus:border-ambergold focus:outline-none transition-colors font-regular"
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
                                            className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-4 py-3 text-sm focus:border-ambergold focus:outline-none transition-colors font-regular"
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
                                        className="w-full bg-main/80 border border-white/20 text-white placeholder-slate-400 px-4 py-3 text-sm focus:border-ambergold focus:outline-none transition-colors resize-none font-regular"
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
                                        className="w-full sm:w-auto px-8 py-3.5 bg-ambergold text-main font-headers font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
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
            </motion.div>
        </section>
    );
};

export default Contact;
