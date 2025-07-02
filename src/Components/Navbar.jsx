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

        <div className="">

            <div>
                <div className="flex flex-row justify-between p-5 md:px-30 bg-emerald  font-headers text-white shadow-xl sticky top-0 z-50">
                    <div>
                        <PageIcon className="h-6 w-6"  />
                    </div>
                    <nav className="flex gap-8 font-medium p-1 ">
                        <Link to="About Us" spy={true} smooth={true} duration={300} cursor-pointer className="hover:text-gold transition-colors duration-300 cursor-pointer">
                            About Us
                        </Link>
                        <Link to="Services" spy={true} smooth={true} duration={300} cursor-pointer className="hover:text-gold transition-colors duration-300 cursor-pointer">
                            Services
                        </Link>
                        <Link to="Contact" spy={true} smooth={true} duration={300} cursor-pointer className="hover:text-gold transition-colors duration-300 cursor-pointer">
                            Contact
                        </Link>
                    </nav>
                </div>


            </div>
        </div>


    );
}
export default Navbar;