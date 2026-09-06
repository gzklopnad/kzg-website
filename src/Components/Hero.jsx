
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

const Hero = ({ skipSteps, setSkipSteps }) => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const { t } = useTranslation();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const [step, setStep] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [shouldPlayVideo, setShouldPlayVideo] = useState(true);

    useEffect(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSaveData = navigator.connection && navigator.connection.saveData;
        if (isReducedMotion || isSaveData) {
            setShouldPlayVideo(false);
        }
    }, []);

    useEffect(() => {
        if (skipSteps) {
            setStep(4);
            setHasReachedEnd(true);
            setSkipSteps(false);
        }
    }, [skipSteps, setSkipSteps]);

    // Fast, concise scroll behavior: once final step is revealed, it stays pinned during reverse scroll
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (skipSteps) return;

        // Reset step progression only if user scrolls back to the very top
        if (v < 0.05) {
            setHasReachedEnd(false);
            setStep(0);
            return;
        }

        // Keep final 3 points ("We supply. We consult. We deliver.") visible when scrolling back up
        if (hasReachedEnd) {
            if (step !== 4) setStep(4);
            return;
        }

        // Progression on initial scroll down
        let nextStep = 0;
        if (v >= 0.8) {
            nextStep = 4;
            setHasReachedEnd(true);
        } else if (v >= 0.6) {
            nextStep = 3;
        } else if (v >= 0.4) {
            nextStep = 2;
        } else if (v >= 0.2) {
            nextStep = 1;
        } else {
            nextStep = 0;
        }

        setStep((prev) => (prev !== nextStep ? nextStep : prev));
    });

    const textVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } },
    };

    const titleText = t('hero.title');
    const titleWords = titleText.split(" ");

    const titleContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.28,
                delayChildren: 0.3,
            },
        },
    };

    const wordVariants = {
        hidden: {
            opacity: 0,
            y: 12,
            filter: "blur(16px)",
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    return (
        <section ref={sectionRef} className="relative w-full h-[280vh]">
            {/* Sticky hero viewport */}
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* Optimized background video with WebM/MP4 codecs and poster fallback */}
                <video
                    ref={videoRef}
                    autoPlay={shouldPlayVideo}
                    loop
                    muted
                    playsInline
                    poster="/videos/kzg_vid_poster.webp"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/videos/kzg_vid.webm" type="video/webm" />
                    <source src="/videos/kzg_vid.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/70 z-0" />

                {/* Foreground content container */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">

                    {/* Primary H1 heading with slow prestige solid-white optical reveal */}
                    <motion.h1
                        variants={titleContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl md:text-5xl lg:text-6xl font-headers font-extrabold tracking-[0.2em] uppercase mb-15 flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-white drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
                    >
                        {titleWords.map((word, idx) => (
                            <motion.span
                                key={idx}
                                variants={wordVariants}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    {/* Step transition container */}
                    <div className="relative flex items-center justify-center min-h-[160px] w-full max-w-4xl">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.p
                                    key="step1"
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute max-w-xl font-regular text-2xl p-3 md:text-3xl font-light"
                                >
                                    {t('hero.step1')}
                                </motion.p>
                            )}

                            {step === 2 && (
                                <motion.p
                                    key="step2"
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute max-w-xl font-regular text-2xl p-3 md:text-3xl font-light"
                                >
                                    {t('hero.step2')}
                                </motion.p>
                            )}

                            {step === 3 && (
                                <motion.p
                                    key="step3"
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute max-w-xl font-regular text-2xl p-3 md:text-3xl font-light"
                                >
                                    {t('hero.step3')}
                                </motion.p>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute flex flex-col gap-3 font-regular p-3 font-semibold bg-gradient-to-r from-lightestofall from-0% to-lightsecond to-100% bg-clip-text text-transparent text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                                >
                                    <p>{t('hero.final1')}</p>
                                    <p>{t('hero.final2')}</p>
                                    <p>{t('hero.final3')}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
