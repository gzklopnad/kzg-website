
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

const Hero = ({ skipSteps, setSkipSteps }) => {
    const sectionRef = useRef(null); // Reference to the scroll container
    const { t } = useTranslation();  // Translation function from i18n

    // Track vertical scroll progress within sectionRef
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const [step, setStep] = useState(0); // Current visual step based on scroll
    const [hasReachedEnd, setHasReachedEnd] = useState(false); // Track if final step reached
    const [hasMounted, setHasMounted] = useState(false); // Ensure scroll logic only runs after mount

    // Delay logic slightly after mount to prevent animation jumpiness
    useEffect(() => {
        setTimeout(() => {
            setHasMounted(true);
        }, 50);
    }, []);

    // Scroll percentage thresholds to trigger step transitions
    const thresholds = [0.2, 0.4, 0.6, 0.8];

    // Listen to scrollYProgress and update step accordingly
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (!hasMounted) return; // Ignore updates before mount

        // If user skipped steps, jump directly to final step
        if (skipSteps) {
            if (v >= 0.95 && !hasReachedEnd) {
                setStep(4);
                setHasReachedEnd(true);
                setSkipSteps(false);
            }
            return;
        }

        // Prevent changing steps once final step is shown
        if (hasReachedEnd) return;

        // Determine which step to show based on current scroll position
        for (let i = 0; i < thresholds.length; i++) {
            if (v < thresholds[i]) {
                if (step !== i) setStep(i);
                return;
            }
        }

        // If passed all thresholds, show final step
        if (step !== thresholds.length) {
            setStep(thresholds.length);
            setHasReachedEnd(true);
        }
    });

    // Animation settings for fading in text
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        // Container with very tall height to enable scroll effect
        <section ref={sectionRef} className="relative w-full h-[400vh]">
            {/* Sticky hero area that remains visible while scrolling */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Background video with dark overlay */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/videos/kzg_vid.mp4"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70 z-0" />

                {/* Foreground content container */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">

                    {/* Hero heading with entrance animation */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl mb-15 lg:text-6xl font-headers font-extrabold tracking-wide"
                    >
                        {t('hero.title')}
                    </motion.h2>

                    {/* Scroll step 1: brief paragraph */}
                    {!skipSteps && step === 1 && (
                        <motion.p
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            className="absolute top-1/2 translate-y-10 max-w-xl font-regular text-2xl p-3 md:text-3xl font-light"
                        >
                            {t('hero.step1')}
                        </motion.p>
                    )}

                    {/* Scroll step 2 */}
                    {!skipSteps && step === 2 && (
                        <motion.p
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            className="absolute top-1/2 translate-y-10 max-w-xl font-regular text-2xl p-3 md:text-3xl font-light"
                        >
                            {t('hero.step2')}
                        </motion.p>
                    )}

                    {/* Scroll step 3 */}
                    {!skipSteps && step === 3 && (
                        <motion.p
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            className="absolute top-1/2 translate-y-10 max-w-xl font-regular text-2xl p-3 md:text-3xl font-light"
                        >
                            {t('hero.step3')}
                        </motion.p>
                    )}

                    {/* Step 4: show multi-line message */}
                    {step === 4 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="absolute top-1/2 translate-y-10 flex flex-col gap-5 font-regular p-3 font-semibold bg-gradient-to-r from-lightestofall from-0% to-lightsecond to-100% bg-clip-text text-transparent text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                        >
                            <p>{t('hero.final1')}</p>
                            <p>{t('hero.final2')}</p>
                            <p>{t('hero.final3')}</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
