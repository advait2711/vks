import { useTranslation } from 'react-i18next';
import '../styles/languageswitcher.css';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language;

    return (
        <div className="language-switcher">
            <button
                className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
                aria-label="Switch to English"
            >
                {t('language.english')}
            </button>
            <span className="lang-divider">|</span>
            <button
                className={`lang-btn ${currentLanguage === 'ml' ? 'active' : ''}`}
                onClick={() => changeLanguage('ml')}
                aria-label="Switch to Malayalam"
            >
                {t('language.malayalam')}
            </button>
        </div>
    );
};

export default LanguageSwitcher;
