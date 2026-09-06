import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import { Globe } from 'lucide-react';
import PageIcon from "./PageIcon.jsx";

const Navbar = ({ onNavClick }) => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLang = (i18n.language || 'en').slice(0, 2).toLowerCase();

    return (
        <header className="flex flex-row justify-between sticky w-full px-8 sm:px-12 lg:px-24 py-5 sm:py-3 md:py-3 lg:py-3 text-white shadow-xl top-0 z-50 bg-main/85 backdrop-blur-md border-b border-white/10">

            {/* Company logo */}
            <div className="flex items-center">
                <PageIcon />
            </div>

            {/* Nav buttons & Language switcher */}
            <nav className="flex space-x-3 sm:space-x-6 text-sm md:text-base items-center">
                <Link
                    to="about"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => onNavClick()}
                    className="font-headers uppercase tracking-widest text-xs sm:text-sm md:text-base font-semibold hover:text-ambergold transition-colors duration-500 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.about")}
                </Link>

                <Link
                    to="services"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => onNavClick()}
                    className="font-headers uppercase tracking-widest text-xs sm:text-sm md:text-base font-semibold hover:text-ambergold transition-colors duration-500 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.services")}
                </Link>

                <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => onNavClick()}
                    className="font-headers uppercase tracking-widest text-xs sm:text-sm md:text-base font-semibold hover:text-ambergold transition-colors duration-500 cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                    {t("navbar.contact")}
                </Link>

                {/* Sleek Globe + GB / PL Language Switcher */}
                <div className="flex items-center space-x-1.5 pl-3 sm:pl-5 border-l border-white/20">
                    <Globe className="w-4 h-4 text-gray-300 mr-1 inline-block" />
                    <button
                        onClick={() => changeLanguage("en")}
                        aria-label="Switch language to English"
                        className={`px-2.5 py-1 text-xs font-headers uppercase font-bold rounded-full transition-all duration-300 cursor-pointer ${
                            currentLang === 'en'
                                ? 'text-ambergold bg-white/10 border border-ambergold shadow-sm'
                                : 'text-gray-300 hover:text-white'
                        }`}
                    >
                        GB
                    </button>
                    <button
                        onClick={() => changeLanguage("pl")}
                        aria-label="Switch language to Polish"
                        className={`px-2.5 py-1 text-xs font-headers uppercase font-bold rounded-full transition-all duration-300 cursor-pointer ${
                            currentLang === 'pl'
                                ? 'text-ambergold bg-white/10 border border-ambergold shadow-sm'
                                : 'text-gray-300 hover:text-white'
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
