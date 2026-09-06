import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const servicesData = [
    {
        key: 'globalShipping',
        code: '01 / MARITIME & GLOBAL LOGISTICS',
        labelEn: '01 SHIPPING',
        labelPl: '01 WYSYŁKA',
        compliance: ['ISO 9001:2015', 'AEO CERTIFIED', 'EU REGULATORY COMPLIANT'],
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
        alt: 'Container cargo ship operating global freight'
    },
    {
        key: 'railFreight',
        code: '02 / EURASIAN RAIL FREIGHT',
        labelEn: '02 RAIL',
        labelPl: '02 KOLEJ',
        compliance: ['ISO 9001:2015', 'CIM/SMGS DOCUMENTED', 'INTERMODAL VERIFIED'],
        image: 'https://unsplash.com/photos/JQ6knLuGZAA/download?w=1200',
        alt: 'Train yard filled with lots of different trains'
    },
    {
        key: 'customSolutions',
        code: '03 / ENTERPRISE SUPPLY CHAIN',
        labelEn: '03 SOLUTIONS',
        labelPl: '03 ROZWIĄZANIA',
        compliance: ['ISO 9001:2015', 'SCALABLE INFRASTRUCTURE', 'SUPPLY CHAIN AUDITED'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Logistics cargo hub warehouse facility'
    },
    {
        key: 'consulting',
        code: '04 / REGULATORY & CUSTOMS ADVISORY',
        labelEn: '04 ADVISORY',
        labelPl: '04 DORADZTWO',
        compliance: ['ISO 9001:2015', 'CUSTOMS ACCREDITED', 'RISK COMPLIANT'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        alt: 'B2B logistics strategy consulting session'
    },
    {
        key: 'metalSupply',
        code: '05 / METALLURGICAL PRODUCTS',
        labelEn: '05 METALS',
        labelPl: '05 METALE',
        compliance: ['ISO 9001:2015', 'EN STANDARDS CERTIFIED', 'JIT DELIVERY VERIFIED'],
        image: 'https://unsplash.com/photos/ENiGFCmBYj4/download?w=1200',
        alt: 'Black and yellow metal tank'
    },
    {
        key: 'slagSupply',
        code: '06 / INDUSTRIAL BYPRODUCTS',
        labelEn: '06 SLAG & BYPRODUCTS',
        labelPl: '06 ŻUŻEL I PRODUKTY UBOŻNE',
        compliance: ['ISO 9001:2015', 'REACH COMPLIANT', 'ECO-CERTIFIED AGGREGATE'],
        image: 'https://unsplash.com/photos/ZLzkwU49BdY/download?w=1200',
        alt: 'Large piece of molten metal being poured onto a machine'
    }
];

const Services = () => {
    const { t, i18n } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const isPl = (i18n.language || 'en').startsWith('pl');

    const activeService = servicesData[activeIndex];
    const activeBullets = t(`services.${activeService.key}.bullets`, { returnObjects: true }) || [];

    return (
        <section id="services" className="bg-white text-main py-16 lg:py-24 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">

                {/* Structured B2B Tab Bar */}
                <div className="border-b border-gray-200">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                        {servicesData.map((service, idx) => {
                            const label = isPl ? service.labelPl : service.labelEn;
                            const isSelected = activeIndex === idx;
                            return (
                                <button
                                    key={service.key}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`py-3 px-2 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer text-center border-b-2 rounded-none ${
                                        isSelected
                                            ? 'text-main border-main bg-gray-50'
                                            : 'text-gray-500 hover:text-gray-900 border-transparent hover:bg-gray-50/50'
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 50/50 Split Container */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeService.key}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="grid grid-cols-1 lg:grid-cols-2 items-stretch border border-gray-200 bg-white min-h-[500px]"
                    >
                        {/* Left Column: Information & Micro-Spec Grid */}
                        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
                            <div className="space-y-4">
                                <div className="font-mono text-xs font-semibold uppercase tracking-widest text-gray-500">
                                    {activeService.code}
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-headers font-extrabold text-main tracking-tight">
                                    {t(`services.${activeService.key}.title`)}
                                </h3>
                                <p className="text-base sm:text-lg font-regular text-gray-700 font-light leading-relaxed">
                                    {t(`services.${activeService.key}.subtitle`)}
                                </p>
                            </div>

                            {/* Micro-Spec Grid */}
                            <div className="pt-6 border-t border-gray-200 space-y-3">
                                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                    {isPl ? 'SPECYFIKACJA I ZAKRES OPERACYJNY' : 'CAPABILITY & OPERATIONAL SPECS'}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {Array.isArray(activeBullets) && activeBullets.map((point, idx) => (
                                        <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm font-mono text-gray-800 uppercase tracking-wider">
                                            <span className="w-1.5 h-1.5 rounded-none bg-main mt-1.5 shrink-0" />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Primary Action Button */}
                            <div>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center px-8 py-3.5 bg-main text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-lighter-main transition-colors duration-200 rounded-none shadow-sm"
                                >
                                    {isPl ? 'ZAPYTAJ O SPECYFIKACJĘ ↗' : 'INQUIRE SOURCING SPECS ↗'}
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Full-Bleed Media & Compliance Bar */}
                        <div className="relative min-h-[360px] sm:min-h-[420px] lg:min-h-[500px] w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-200 bg-gray-100">
                            <img
                                src={activeService.image}
                                alt={activeService.alt}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                            {/* Institutional Compliance Badge */}
                            <div className="absolute bottom-0 inset-x-0 bg-main/90 backdrop-blur-sm px-6 py-3.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-gray-200 uppercase border-t border-white/10">
                                {activeService.compliance.map((item, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <span>{item}</span>
                                        {i < activeService.compliance.length - 1 && (
                                            <span className="w-1 h-1 bg-ambergold hidden sm:inline-block" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Services;
