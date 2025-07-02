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


                <div className="flex flex-row justify-between sticky w-full px-4 py-3 bg-emerald  font-headers text-white shadow-xl  top-0 z-50 ">
                    <div className="flex  items-center">
                        <PageIcon/>
                    </div>
                    <nav className="flex space-x-6 text-sm md:text-xl items-center
 ">
                        <Link to="About Us" spy={true} smooth={true} duration={300} cursor-pointer className="hover:text-gold transition-colors duration-500 cursor-pointer">
                            About Us
                        </Link>
                        <Link to="Services" spy={true} smooth={true} duration={300} cursor-pointer className="hover:text-gold transition-colors duration-500 cursor-pointer">
                            Services
                        </Link>
                        <Link to="Contact" spy={true} smooth={true} duration={300} cursor-pointer className="hover:text-gold transition-colors duration-500 cursor-pointer">
                            Contact
                        </Link>
                    </nav>
                </div>





    );
}
export default Navbar;