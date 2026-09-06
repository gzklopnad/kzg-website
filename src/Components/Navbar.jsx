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
            className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-500 flex flex-row justify-between items-center px-6 sm:px-10 lg:px-16 py-3 sm:py-3.5 ${
                scrolled
                    ? 'bg-main/75 backdrop-blur-md border-b border-white/10 shadow-lg'
                    : 'bg-transparent border-b border-transparent shadow-none'
            }`}
        >

            {/* Balanced Company Logo */}
            <div className="flex items-center cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                <PageIcon className="w-20 sm:w-24 lg:w-28" />
            </div>

            {/* Balanced Nav Buttons & Language Switcher */}
            <nav className="flex space-x-5 sm:space-x-7 lg:space-x-9 items-center">
                <Link
                    to="about"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="font-headers uppercase tracking-wider text-xs sm:text-sm md:text-base font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:text-ambergold transition-colors duration-300 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-ambergold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.about")}
                </Link>

                <Link
                    to="services"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => onNavClick()}
                    className="font-headers uppercase tracking-wider text-xs sm:text-sm md:text-base font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:text-ambergold transition-colors duration-300 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-ambergold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.services")}
                </Link>

                <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => onNavClick()}
                    className="font-headers uppercase tracking-wider text-xs sm:text-sm md:text-base font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:text-ambergold transition-colors duration-300 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-ambergold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.contact")}
                </Link>

                {/* Balanced Globe + GB / PL Language Switcher */}
                <div className="flex items-center space-x-1.5 pl-3 sm:pl-4 border-l border-white/20">
                    <Globe className="w-4 h-4 text-gray-200 mr-1 inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]" />
                    <button
                        onClick={() => changeLanguage("en")}
                        aria-label="Switch language to English"
                        className={`px-2.5 py-1 text-xs font-headers uppercase font-bold rounded-full transition-all duration-300 cursor-pointer ${
                            currentLang === 'en'
                                ? 'text-ambergold bg-white/20 border border-ambergold shadow-sm'
                                : 'text-gray-200 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'
                        }`}
                    >
                        GB
                    </button>
                    <button
                        onClick={() => changeLanguage("pl")}
                        aria-label="Switch language to Polish"
                        className={`px-2.5 py-1 text-xs font-headers uppercase font-bold rounded-full transition-all duration-300 cursor-pointer ${
                            currentLang === 'pl'
                                ? 'text-ambergold bg-white/20 border border-ambergold shadow-sm'
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
