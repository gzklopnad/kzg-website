import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const servicesData = [
    {
        key: 'globalShipping',
        code: '01 / MARITIME & GLOBAL LOGISTICS',
        compliance: ['ISO 9001:2015', 'AEO CERTIFIED', 'EU REGULATORY COMPLIANT'],
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
        alt: 'Container cargo ship operating global freight'
    },
    {
        key: 'railFreight',
        code: '02 / EURASIAN RAIL FREIGHT',
        compliance: ['ISO 9001:2015', 'CIM/SMGS DOCUMENTED', 'INTERMODAL VERIFIED'],
        image: 'https://images.unsplash.com/photo-1515165562839-978401074bf4?auto=format&fit=crop&w=1200&q=80',
        alt: 'Industrial rail freight freight train on tracks'
    },
    {
        key: 'customSolutions',
        code: '03 / ENTERPRISE SUPPLY CHAIN',
        compliance: ['ISO 9001:2015', 'SCALABLE INFRASTRUCTURE', 'SUPPLY CHAIN AUDITED'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        alt: 'Logistics cargo hub warehouse facility'
    },
    {
        key: 'consulting',
        code: '04 / REGULATORY & CUSTOMS ADVISORY',
        compliance: ['ISO 9001:2015', 'CUSTOMS ACCREDITED', 'RISK COMPLIANT'],
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        alt: 'B2B logistics strategy consulting session'
    },
    {
        key: 'metalSupply',
        code: '05 / METALLURGICAL PRODUCTS',
        compliance: ['ISO 9001:2015', 'EN STANDARDS CERTIFIED', 'JIT DELIVERY VERIFIED'],
        image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
        alt: 'Industrial metal tubes and structural steel warehouse'
    },
    {
        key: 'slagSupply',
        code: '06 / INDUSTRIAL BYPRODUCTS',
        compliance: ['ISO 9001:2015', 'REACH COMPLIANT', 'ECO-CERTIFIED AGGREGATE'],
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
        alt: 'Processed slag byproduct and industrial material processing facility'
    }
];

const Services = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const activeService = servicesData[activeIndex];
    const activeBullets = t(`services.${activeService.key}.bullets`, { returnObjects: true }) || [];

    return (
        <section className="bg-secondary text-main py-16 lg:py-24 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">

                {/* B2B Service Selector Tabs */}
                <div className="overflow-x-auto pb-4 scrollbar-none border-b border-gray-300">
                    <div className="flex space-x-6 min-w-max">
                        {servicesData.map((service, idx) => {
                            const title = t(`services.${service.key}.title`);
                            const isSelected = activeIndex === idx;
                            return (
                                <button
                                    key={service.key}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`text-xs sm:text-sm font-headers uppercase tracking-widest pb-3 font-semibold transition-all duration-200 cursor-pointer relative ${
                                        isSelected
                                            ? 'text-main font-bold border-b-2 border-main'
                                            : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    <span className="text-gray-400 mr-2">0{idx + 1}</span>
                                    {title}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 50/50 Split Layout View */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeService.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch border border-gray-300 bg-white shadow-sm p-6 sm:p-10 lg:p-12"
                    >
                        {/* Left Column: Text & Capabilities */}
                        <div className="flex flex-col justify-between space-y-8">
                            <div className="space-y-4">
                                <div className="text-xs font-headers font-bold tracking-widest text-gray-500 uppercase">
                                    {activeService.code}
                                </div>
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-headers font-extrabold text-main tracking-tight">
                                    {t(`services.${activeService.key}.title`)}
                                </h3>
                                <p className="text-lg sm:text-xl font-regular text-gray-700 font-light leading-relaxed">
                                    {t(`services.${activeService.key}.subtitle`)}
                                </p>
                            </div>

                            {/* Capability Grid */}
                            <div className="py-6 border-y border-gray-200 my-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Array.isArray(activeBullets) && activeBullets.map((point, idx) => (
                                        <div key={idx} className="flex items-start space-x-3 text-sm sm:text-base font-regular text-gray-800">
                                            <span className="w-1.5 h-1.5 rounded-full bg-main mt-2 shrink-0" />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center px-8 py-3.5 bg-main text-white font-headers text-xs uppercase tracking-widest font-semibold hover:bg-lighter-main transition-colors duration-300 shadow-sm"
                                >
                                    {t("navbar.contact")}
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Full-Bleed Media & Compliance Bar */}
                        <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] w-full overflow-hidden border border-gray-200">
                            <img
                                src={activeService.image}
                                alt={activeService.alt}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Institutional Compliance Badge Pinned at Bottom Bar */}
                            <div className="absolute bottom-0 left-0 right-0 bg-main/90 backdrop-blur-sm px-4 sm:px-6 py-3 flex items-center justify-between text-[10px] sm:text-[11px] font-headers tracking-widest text-gray-200 uppercase border-t border-white/10">
                                {activeService.compliance.map((item, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <span>{item}</span>
                                        {i < activeService.compliance.length - 1 && (
                                            <span className="w-1 h-1 rounded-full bg-ambergold hidden sm:inline-block" />
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
