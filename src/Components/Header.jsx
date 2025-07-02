import { useTranslation } from 'react-i18next';
function Header() {
    // i18n translation
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (
        <div className="header">
            <button className="" onClick={}></button>





        </div>





    );
}
export default Header;