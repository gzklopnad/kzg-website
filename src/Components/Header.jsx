import { useTranslation } from 'react-i18next';

const Header = () => {

    // i18n translation
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative w-full  h-[60vh] md:h-[80vh]">
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
                <h2 className="text-4xl font-bold mb-4">What We Do</h2>
                <p className="max-w-xl text-lg">We deliver global logistics through seamless rail, sea, and road integration.</p>
            </div>
        </div>


    );
}
export default Header;