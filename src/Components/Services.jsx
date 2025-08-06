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
                <h2 className="text-6xl text-left text-shadow-xs text-shadow-lightest">
                    {t('services.title')}
                </h2>
                <h2 className="text-4xl italic font-extralight text-left">
                    {t('services.subtitle')}
                </h2>
            </FadeInSection>

            {/* Service Pillars */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                    { icon: <Globe className="w-8 h-8 text-emerald" />, key: 'globalShipping' },
                    { icon: <TrainFront className="w-8 h-8 text-emerald" />, key: 'railFreight' },
                    { icon: <Settings className="w-8 h-8 text-emerald" />, key: 'customSolutions' },
                    { icon: <Lightbulb className="w-8 h-8 text-emerald" />, key: 'consulting' },
                    { icon: <Package className="w-8 h-8 text-emerald" />, key: 'metalSupply' },
                    { icon: <Factory className="w-8 h-8 text-emerald" />, key: 'slagSupply' },
                ].map(({ icon, key }) => (
                    <FadeInSection key={key}>
                        <div className="border p-6 rounded-xl shadow hover:shadow-md transition">
                            <div className="mb-4">{icon}</div>
                            <h3 className="text-xl font-semibold">{t(`services.${key}.title`)}</h3>
                            <p className="text-gray-600 mb-2">{t(`services.${key}.subtitle`)}</p>
                            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                {t(`services.${key}.bullets`, { returnObjects: true }).map((point, i) => (
                                    <li key={i}>{point}</li>
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
    const isInView = useInView(ref, { once: true, margin: '-100px' }); // trigger slightly before full visibility

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
