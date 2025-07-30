import { useTranslation } from 'react-i18next';
import {Link} from 'react-scroll';
import PageIcon from "./PageIcon.jsx";

const Navbar = ({onNavClick}) => {

    // i18n translation
     const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };



    return (


        <div className="flex flex-row justify-between sticky w-full px-6 sm:px-12 lg:px-24 py-3 font-headers text-white shadow-xl top-0 z-50 bg-lighter-main/40 backdrop-blur-md">


        {/* Company logo */}
                    <div className="flex  items-center ">
                        <PageIcon/>
                    </div>

                    {/* Nav buttons acting as links*/}
                    <nav className="flex space-x-6 text-sm md:text-xl items-center">
                        <Link to="about" spy={true} smooth={true} duration={500} cursor-pointer
                              onClick={() => onNavClick()}
                              className="font-regular hover:text-ambergold transition-colors duration-500
                              cursor-pointer relative after:absolute
                              after:bottom-0 after:left-0 after:h-0.5
                              after:w-full after:origin-bottom-right
                               after:scale-x-0 after:bg-gold after:transition-transform
                               after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                            About Us
                        </Link>
                        <Link to="services" spy={true} smooth={true} duration={500} cursor-pointer
                              onClick={() => onNavClick()}
                              className="font-regular hover:text-ambergold transition-colors duration-500
                              cursor-pointer relative after:absolute
                              after:bottom-0 after:left-0 after:h-0.5
                              after:w-full after:origin-bottom-right
                               after:scale-x-0 after:bg-gold after:transition-transform
                               after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                            Services
                        </Link>
                        <Link to="contact" spy={true} smooth={true} duration={500} cursor-pointer
                              onClick={() => onNavClick()}
                              className="font-regular hover:text-ambergold transition-colors duration-500
                              cursor-pointer relative after:absolute
                              after:bottom-0 after:left-0 after:h-0.5
                              after:w-full after:origin-bottom-right
                               after:scale-x-0 after:bg-gold after:transition-transform
                               after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                            Contact
                        </Link>
                        <button onClick={() => changeLanguage("en")}>🇬🇧</button>
                        <button onClick={() => changeLanguage("pl")}>🇵🇱</button>
                    </nav>
                </div>





    );
}
export default Navbar;