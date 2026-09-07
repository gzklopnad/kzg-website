
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";

const SLIDE_DURATION = 5000; // 5 seconds per slide

const slideKeys = [
    {
        id: '01',
        label: '01 SOURCING',
        eyebrowEn: 'INDUSTRIAL MATERIALS & SOURCING',
        eyebrowPl: 'MATERIAŁY PRZEMYSŁOWE I ZAOPATZENIE',
        textEn: 'Supply and distribution of industrial metals, metallurgical slag, and certified smelting byproducts.',
        textPl: 'Dostawy i dystrybucja metali przemysłowych, żużla hutniczego oraz certyfikowanych produktów ubocznych.'
    },
    {
        id: '02',
        label: '02 FREIGHT',
        eyebrowEn: 'MULTIMODAL LOGISTICS',
        eyebrowPl: 'LOGISTYKA MULTIMODALNA',
        textEn: 'Cross-border freight coordination across dedicated rail, sea, and road corridors.',
        textPl: 'Koordynacja przewozów transgranicznych w dedykowanych korytarzach kolejowych, morskich i drogowych.'
    },
    {
        id: '03',
        label: '03 ADVISORY',
        eyebrowEn: 'TRADE CONSULTING & COMPLIANCE',
        eyebrowPl: 'DORADZTWO HANDLOWE I ZGODNOŚĆ',
        textEn: 'Risk assessment, customs procedures, and strategic routing for complex cargo flows.',
        textPl: 'Ocena ryzyka, procedury celne i strategiczne planowanie tras dla skomplikowanych łańcuchów dostaw.'
    }
];

const Hero = ({ skipSteps, setSkipSteps }) => {
    const videoRef = useRef(null);
    const { i18n } = useTranslation();
    const isPl = (i18n.language || 'en').startsWith('pl');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    // Reduced motion & save data check
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);
        const isSaveData = navigator.connection && navigator.connection.saveData;
        if (mediaQuery.matches || isSaveData) {
            setShouldPlayVideo(false);
        }
        const handler = (e) => setIsReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Handle skipSteps from Navbar link clicks
    useEffect(() => {
        if (skipSteps) {
            setCurrentIndex(2);
            setProgress(0);
            setSkipSteps(false);
        }
    }, [skipSteps, setSkipSteps]);

    // Timer & Progress Animation Loop (50ms interval)
    useEffect(() => {
        if (isReducedMotion || isPaused) return;

        const interval = 50; // update every 50ms
        const stepAmount = (interval / SLIDE_DURATION) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const nextProgress = prev + stepAmount;
                if (nextProgress >= 100) {
                    return 100;
                }
                return nextProgress;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, isPaused, isReducedMotion]);

    // Advance slide cleanly when progress reaches 100% (Continuous Infinite Loop)
    useEffect(() => {
        if (progress >= 100) {
            setCurrentIndex((prev) => (prev + 1) % slideKeys.length);
            setProgress(0);
        }
    }, [progress]);

    const handleScrubberClick = useCallback((idx) => {
        setCurrentIndex(idx);
        setProgress(0);
    }, []);

    const activeSlide = slideKeys[currentIndex];

    return (
        <section className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden bg-black">

            {/* Black Fade-In Overlay */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isVideoLoaded ? 0 : 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 bg-black z-1 pointer-events-none"
            />

            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay={shouldPlayVideo}
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => setIsVideoLoaded(true)}
                onPlaying={() => setIsVideoLoaded(true)}
                poster="/videos/kzg_vid_poster.webp"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <source src="/videos/hero-final.mp4" type="video/mp4" />
            </video>

            {/* Directional Vignette Gradient Overlay — keeps video 100% visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 z-[2] pointer-events-none" />

            {/* Main Interactive Viewport Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-8 lg:px-16 pointer-events-none">
                {/* Left-Aligned B2B Editorial Text Container */}
                <div
                    className="absolute bottom-36 sm:bottom-44 left-8 lg:left-16 max-w-2xl w-fit text-left pointer-events-auto cursor-default"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="space-y-3"
                        >
                            {/* Eyebrow */}
                            <div className="text-xs font-headers font-bold tracking-[0.2em] text-slate-300 uppercase flex items-center space-x-2">
                                <span className="w-2 h-[2px] bg-ambergold inline-block" />
                                <span>{isPl ? activeSlide.eyebrowPl : activeSlide.eyebrowEn}</span>
                            </div>

                            {/* Main B2B Operational Statement */}
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-headers font-bold tracking-tight text-white leading-snug drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
                                {isPl ? activeSlide.textPl : activeSlide.textEn}
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Scrubber Bar Pinned above taskbar / bottom edge */}
                <div
                    className="absolute bottom-16 sm:bottom-20 inset-x-8 lg:inset-x-16 max-w-7xl mx-auto pointer-events-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <div className="grid grid-cols-3 gap-4 sm:gap-8">
                        {slideKeys.map((slide, idx) => {
                            const isActive = currentIndex === idx;
                            const isCompleted = idx < currentIndex;
                            const fillPercent = isActive ? progress : isCompleted ? 100 : 0;

                            return (
                                <button
                                    key={slide.id}
                                    onClick={() => handleScrubberClick(idx)}
                                    className="flex flex-col justify-center space-y-2 group cursor-pointer text-left min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded-sm"
                                    aria-label={`Jump to ${slide.label}`}
                                >
                                    {/* Top Line: 2px progress track */}
                                    <div className="h-[2px] w-full bg-white/20 overflow-hidden relative rounded-full">
                                        <div
                                            className="h-full bg-white transition-all"
                                            style={{
                                                width: `${fillPercent}%`,
                                                transitionDuration: isReducedMotion || fillPercent === 0 ? '0ms' : '50ms'
                                            }}
                                        />
                                    </div>

                                    {/* Bottom Line: Compact Label */}
                                    <div className="text-[11px] font-headers font-bold uppercase tracking-wider transition-colors text-left pt-1">
                                        <span className={isActive ? "text-white font-bold" : "text-slate-400 group-hover:text-white"}>
                                            {slide.label}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
