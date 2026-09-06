import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { Globe } from 'lucide-react';
import PageIcon from "./PageIcon.jsx";
import { useState, useEffect } from "react";

const Navbar = ({ onNavClick }) => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLang = (i18n.language || 'en').slice(0, 2).toLowerCase();

    return (
        <header
            className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-500 flex flex-row justify-between items-center px-8 sm:px-12 lg:px-20 py-4 sm:py-5 ${
                scrolled
                    ? 'bg-main/75 backdrop-blur-md border-b border-white/10 shadow-xl'
                    : 'bg-transparent border-b border-transparent shadow-none'
            }`}
        >

            {/* Bigger Company Logo */}
            <div className="flex items-center cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                <PageIcon className="w-24 sm:w-32 lg:w-40" />
            </div>

            {/* Bigger Nav Buttons & Language Switcher */}
            <nav className="flex space-x-5 sm:space-x-8 lg:space-x-12 items-center">
                <Link
                    to="about"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="font-headers uppercase tracking-widest text-sm sm:text-base lg:text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:text-ambergold transition-colors duration-300 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-ambergold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.about")}
                </Link>

                <Link
                    to="services"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => onNavClick()}
                    className="font-headers uppercase tracking-widest text-sm sm:text-base lg:text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:text-ambergold transition-colors duration-300 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-ambergold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.services")}
                </Link>

                <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => onNavClick()}
                    className="font-headers uppercase tracking-widest text-sm sm:text-base lg:text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:text-ambergold transition-colors duration-300 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-ambergold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.contact")}
                </Link>

                {/* Sleek Bigger Globe + GB / PL Language Switcher */}
                <div className="flex items-center space-x-2 pl-4 sm:pl-6 border-l border-white/20">
                    <Globe className="w-5 h-5 text-gray-200 mr-1.5 inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" />
                    <button
                        onClick={() => changeLanguage("en")}
                        aria-label="Switch language to English"
                        className={`px-3 py-1 text-xs sm:text-sm font-headers uppercase font-extrabold rounded-full transition-all duration-300 cursor-pointer ${
                            currentLang === 'en'
                                ? 'text-ambergold bg-white/20 border border-ambergold shadow-md'
                                : 'text-gray-200 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'
                        }`}
                    >
                        GB
                    </button>
                    <button
                        onClick={() => changeLanguage("pl")}
                        aria-label="Switch language to Polish"
                        className={`px-3 py-1 text-xs sm:text-sm font-headers uppercase font-extrabold rounded-full transition-all duration-300 cursor-pointer ${
                            currentLang === 'pl'
                                ? 'text-ambergold bg-white/20 border border-ambergold shadow-md'
                                : 'text-gray-200 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'
                        }`}
                    >
                        PL
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
