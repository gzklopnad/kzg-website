import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Package, Globe, Settings, Factory, Lightbulb, TrainFront } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
};

const Services = () => {
    const { t } = useTranslation();

    return (
        <div className="px-6 py-12 space-y-16 bg-secondary">
            {/* Hero */}
            <FadeInSection>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-medium text-left text-shadow-xs text-shadow-lightest">
                    {t('services.title')}
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl italic font-light text-left text-shadow-xs">
                    {t('services.subtitle')}
                </h2>
            </FadeInSection>

            {/* Service Pillars */}
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                {[
                    { icon: <Globe className="w-10 h-10 text-emerald" />, key: 'globalShipping' },
                    { icon: <TrainFront className="w-10 h-10 text-emerald" />, key: 'railFreight' },
                    { icon: <Settings className="w-10 h-10 text-emerald" />, key: 'customSolutions' },
                    { icon: <Lightbulb className="w-10 h-10 text-emerald" />, key: 'consulting' },
                    { icon: <Package className="w-10 h-10 text-emerald" />, key: 'metalSupply' },
                    { icon: <Factory className="w-10 h-10 text-emerald" />, key: 'slagSupply' },
                ].map(({ icon, key }) => (
                    <FadeInSection key={key}>
                        <div className="flex flex-col justify-between h-full border p-8 rounded-2xl shadow hover:shadow-lg transition text-center lg:text-left">

                        <div className="mb-4 flex justify-center lg:justify-start">{icon}</div>
                            <h3 className="text-2xl sm:text-3xl font-semibold mb-2">{t(`services.${key}.title`)}</h3>
                            <p className="text-lg sm:text-xl text-gray-600 mb-4">
                                {t(`services.${key}.subtitle`)}
                            </p>
                            <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 space-y-2 text-left lg:text-left sm:text-center">
                                {t(`services.${key}.bullets`, { returnObjects: true }).map((point, i) => (
                                    <li key={i} className="sm:text-center lg:text-left">{point}</li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                ))}
            </div>
        </div>
    );
};

export default Services;

// 🔽 FadeInSection Component 🔽
const FadeInSection = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            {children}
        </motion.div>
    );
};
