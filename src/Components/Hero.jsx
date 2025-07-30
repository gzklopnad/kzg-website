import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {useEffect, useRef, useState} from "react";

const Hero = ({ skipSteps, setSkipSteps }) => {
    const sectionRef = useRef(null);
    const { t } = useTranslation();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const [step, setStep] = useState(0);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setHasMounted(true);
        }, 50); // Даем браузеру отрисоваться
    }, []);


    const thresholds = [0.2, 0.4, 0.6, 0.8];

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (!hasMounted) return;

        if (skipSteps) {
            if (v >= 0.95 && !hasReachedEnd) {
                setStep(4);
                setHasReachedEnd(true);
                setSkipSteps(false);
            }
            return;
        }

        if (hasReachedEnd) return;

        for (let i = 0; i < thresholds.length; i++) {
            if (v < thresholds[i]) {
                if (step !== i) setStep(i);
                return;
            }
        }

        if (step !== thresholds.length) {
            setStep(thresholds.length);
            setHasReachedEnd(true);
        }
    });

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section ref={sectionRef} className="relative w-full h-[400vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/videos/kzg_vid.mp4"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70 z-0" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl mb-15 lg:text-6xl font-headers font-extrabold tracking-wide"
                    >
                        What We Do
                    </motion.h2>

                    {!skipSteps && step === 1 && (
                        <motion.p variants={fadeIn} initial="hidden" animate="visible" className="absolute top-1/2 translate-y-10 max-w-xl font-regular text-2xl p-3 md:text-3xl font-light">
                            We supply industrial metals, slag, and byproducts with streamlined sourcing and distribution tailored to global industry demands.
                        </motion.p>
                    )}

                    {!skipSteps && step === 2 && (
                        <motion.p variants={fadeIn} initial="hidden" animate="visible" className="absolute top-1/2 translate-y-10 max-w-xl font-regular text-2xl p-3 md:text-3xl font-light">
                            We deliver global logistics through seamless rail, sea, and road integration.
                        </motion.p>
                    )}

                    {!skipSteps && step === 3 && (
                        <motion.p variants={fadeIn} initial="hidden" animate="visible" className="absolute top-1/2 translate-y-10 max-w-xl font-regular text-2xl p-3 md:text-3xl font-light">
                            We provide expert advice on transportation strategy, customs clearance, and routing documentation to ensure smooth international operations.
                        </motion.p>
                    )}

                    {step === 4 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="absolute top-1/2 translate-y-10 flex flex-col gap-5 font-regular p-3 font-semibold bg-gradient-to-r from-lightestofall from-0% to-lightsecond to-100% bg-clip-text text-transparent text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                        >
                            <p>We supply.</p>
                            <p>We consult.</p>
                            <p>We deliver.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Hero;
