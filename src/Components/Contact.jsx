import { useTranslation } from 'react-i18next';
import { useForm, ValidationError } from '@formspree/react';
import { useState, useRef } from "react";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { motion, useInView } from 'motion/react';

const divisions = [
    { id: 'freight', labelEn: 'Freight Routing', labelPl: 'Transport i Logistyka' },
    { id: 'metals', labelEn: 'Industrial Metals', labelPl: 'Metale Przemysłowe' },
    { id: 'slag', labelEn: 'Slag & Byproducts', labelPl: 'Żużel i Produkty Uboczne' },
    { id: 'advisory', labelEn: 'Advisory', labelPl: 'Doradztwo' }
];

const Contact = () => {
    const { t, i18n } = useTranslation();
    const isPl = (i18n.language || 'en').startsWith('pl');

    const [state, handleSubmit] = useForm("xldnydla");
    const [captchaToken, setCaptchaToken] = useState(null);
    const [targetDivision, setTargetDivision] = useState('freight');
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
        <section id="contact" className="w-full bg-slate-950 text-white border-t border-slate-800 py-16 lg:py-24">
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-800 bg-slate-950 min-h-[580px]">

                    {/* Left Column: Direct Desk & Routing Info (5 cols) */}
                    <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-slate-950">
                        <div className="space-y-4">
                            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400">
                                {isPl ? 'OPERACJE I DYSPOZYCJA' : 'OPERATIONS & DISPATCH'}
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-headers font-bold tracking-tight text-white leading-tight">
                                {isPl ? 'Zapytania Bezpośrednie i Wyceny' : 'Direct Inquiries & Rate Quotes'}
                            </h2>
                            <p className="text-sm font-regular text-slate-400 font-light leading-relaxed">
                                {isPl
                                    ? 'Dedykowana obsługa wycen frachtowych, zaopatrzenia w surowce oraz zagospodarowania żużla.'
                                    : 'Dedicated desk for rate quoting, raw materials procurement, and byproduct sourcing specs.'
                                }
                            </p>
                        </div>

                        {/* Metadata Blocks */}
                        <div className="space-y-4 border-t border-slate-800 pt-6">
                            {/* Logistics & Freight Desk */}
                            <div className="pb-3 border-b border-slate-850 space-y-1">
                                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                                    {isPl ? 'Dział Logistyki i Frachtu' : 'Logistics & Freight Desk'}
                                </div>
                                <div className="text-sm font-mono text-slate-200">
                                    <a href="tel:+48226430060" className="hover:text-ambergold transition-colors mr-4">+48 22 643 00 60</a>
                                    <a href="mailto:logistics@kzgpoland.pl" className="hover:text-ambergold transition-colors">logistics@kzgpoland.pl</a>
                                </div>
                            </div>

                            {/* Raw Materials & Slag Sales */}
                            <div className="pb-3 border-b border-slate-850 space-y-1">
                                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                                    {isPl ? 'Dział Metali i Produktów Ubocznych' : 'Raw Materials & Slag Sales'}
                                </div>
                                <div className="text-sm font-mono text-slate-200">
                                    <a href="mailto:metals@kzgpoland.pl" className="hover:text-ambergold transition-colors">metals@kzgpoland.pl</a>
                                </div>
                            </div>

                            {/* HQ & Registration */}
                            <div className="pb-3 border-b border-slate-850 space-y-1">
                                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                                    {isPl ? 'Siedziba i Rejestracja' : 'HQ & Registration'}
                                </div>
                                <div className="text-xs font-mono text-slate-400 leading-relaxed">
                                    ul. Taśmowa 7, 02-677 Warszawa, Poland<br />
                                    NIP: PL5213904812 | REGON: 386829104
                                </div>
                            </div>

                            {/* Response Standard */}
                            <div className="pt-2">
                                <div className="text-xs font-mono text-ambergold flex items-center space-x-2">
                                    <span className="w-2 h-2 rounded-none bg-ambergold inline-block" />
                                    <span>
                                        {isPl
                                            ? 'Zapytania obsługiwane w ciągu 2 godzin roboczych w strefie CET.'
                                            : 'Inquiries routed within 2 business hours during CET shifts.'
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Structured B2B Inquiry Form (7 cols) */}
                    <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 lg:border-l border-slate-800 bg-slate-900/40 flex flex-col justify-between">
                        {!state.succeeded ? (
                            <form onSubmit={customSubmit} className="space-y-6">

                                {/* Service Target Selector */}
                                <div className="space-y-2">
                                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-400 font-bold">
                                        {isPl ? 'Wybierz Dział Docelowy' : 'Select Service Target'}
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {divisions.map((div) => {
                                            const isSelected = targetDivision === div.id;
                                            return (
                                                <button
                                                    type="button"
                                                    key={div.id}
                                                    onClick={() => setTargetDivision(div.id)}
                                                    className={`py-2 px-3 text-xs font-mono uppercase tracking-wider text-center cursor-pointer rounded-none border transition-colors ${
                                                        isSelected
                                                            ? 'bg-white text-slate-950 font-bold border-white'
                                                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                                                    }`}
                                                >
                                                    {isPl ? div.labelPl : div.labelEn}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <input type="hidden" name="targetDivision" value={targetDivision} />
                                </div>

                                {/* Form Fields Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label htmlFor="name" className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                                            {isPl ? 'Imię i Nazwisko *' : 'Full Name *'}
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder={isPl ? "np. Jan Kowalski" : "e.g. John Doe"}
                                            className="w-full bg-slate-900 border border-slate-750 text-white placeholder-slate-500 rounded-none px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors"
                                        />
                                        <ValidationError prefix="Name" field="name" errors={state.errors} />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="email" className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                                            {isPl ? 'E-mail Służbowy *' : 'Corporate Email *'}
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="name@company.com"
                                            className="w-full bg-slate-900 border border-slate-750 text-white placeholder-slate-500 rounded-none px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors"
                                        />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="company" className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                                            {isPl ? 'Nazwa Firmy *' : 'Company Name *'}
                                        </label>
                                        <input
                                            id="company"
                                            type="text"
                                            name="company"
                                            required
                                            placeholder={isPl ? "np. KZG Logistics Sp. z o.o." : "e.g. Acme Logistics Corp"}
                                            className="w-full bg-slate-900 border border-slate-750 text-white placeholder-slate-500 rounded-none px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="phone" className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                                            {isPl ? 'Numer Telefonu' : 'Phone Number'}
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            placeholder="+48 600 000 000"
                                            className="w-full bg-slate-900 border border-slate-750 text-white placeholder-slate-500 rounded-none px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Textarea for Cargo / Spec details */}
                                <div className="space-y-1">
                                    <label htmlFor="message" className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                                        {isPl ? 'Specyfikacja Ładunku / Zapytanie *' : 'Cargo / Material Specifications *'}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        placeholder={isPl
                                            ? "Opisz trasę frachtu, wolumen metali lub zapotrzebowanie na żużel..."
                                            : "Describe cargo route, volume of metals, or slag aggregate specs..."
                                        }
                                        className="w-full bg-slate-900 border border-slate-750 text-white placeholder-slate-500 rounded-none px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors resize-none"
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
                                        className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-950 font-mono text-xs uppercase tracking-wider font-bold rounded-none hover:bg-slate-200 transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                                    >
                                        {isPl ? 'WYŚLIJ ZAPYTANIE ↗' : 'TRANSMIT INQUIRY ↗'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-8 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 space-y-3 font-mono">
                                <div className="text-xl font-bold uppercase tracking-wider">
                                    {isPl ? 'Zapytanie Zostało Przesłane ↗' : 'Inquiry Transmitted ↗'}
                                </div>
                                <p className="text-xs text-emerald-400">
                                    {isPl
                                        ? 'Dziękujemy. Twoja wiadomość została przekazana do odpowiedniego działu operacyjnego. Nasz zespół skontaktuje się w ciągu 2 godzin.'
                                        : 'Thank you. Your message has been routed to the appropriate operational division. Our desk will contact you within 2 business hours.'
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
