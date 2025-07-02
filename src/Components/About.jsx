import { useTranslation } from 'react-i18next';
function About() {
    // i18n translation
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (

    );
}
export default About;