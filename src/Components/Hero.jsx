import { useTranslation } from 'react-i18next';
import { motion} from "motion/react"
const Hero = () => {

    // i18n translation
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative w-full  h-[100vh] md:h-[100vh]">
            {/* Background video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                src="/videos/kzg_vid.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70 z-0" />

            {/* Text content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h2 className="text-4xl  mb-4 font-headers font-medium italic">What We Do</h2>
                <p className="max-w-xl text-l font-regular font-light">We deliver global logistics through seamless rail, sea, and road integration.</p>
            </div>
        </div>


    );
}
export default Hero;