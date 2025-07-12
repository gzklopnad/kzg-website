import { useTranslation } from 'react-i18next';
import {Link} from 'react-scroll';
import PageIcon from "./PageIcon.jsx";

const Navbar = () => {

    // i18n translation
     const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (


                <div className="flex flex-row bg-op justify-between sticky w-full px-6 sm:px-12 lg:px-24 py-3 bg font-headers text-white shadow-xl  top-0 z-50 bg-lighter-main/40 ">

                    {/* Company logo */}
                    <div className="flex  items-center ">
                        <PageIcon/>
                    </div>

                    {/* Nav buttons acting as links*/}
                    <nav className="flex space-x-6 text-sm md:text-xl items-center">
                        <Link to="about" spy={true} smooth={true} duration={500} cursor-pointer
                              className="font-regular hover:text-gold transition-colors duration-500
                              cursor-pointer relative after:absolute
                              after:bottom-0 after:left-0 after:h-0.5
                              after:w-full after:origin-bottom-right
                               after:scale-x-0 after:bg-gold after:transition-transform
                               after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                            About Us
                        </Link>
                        <Link to="services" spy={true} smooth={true} duration={500} cursor-pointer
                              className="font-regular hover:text-gold transition-colors duration-500
                              cursor-pointer relative after:absolute
                              after:bottom-0 after:left-0 after:h-0.5
                              after:w-full after:origin-bottom-right
                               after:scale-x-0 after:bg-gold after:transition-transform
                               after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                            Services
                        </Link>
                        <Link to="contact" spy={true} smooth={true} duration={500} cursor-pointer
                              className="font-regular hover:text-gold transition-colors duration-500
                              cursor-pointer relative after:absolute
                              after:bottom-0 after:left-0 after:h-0.5
                              after:w-full after:origin-bottom-right
                               after:scale-x-0 after:bg-gold after:transition-transform
                               after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
                            Contact
                        </Link>
                    </nav>
                </div>





    );
}
export default Navbar;