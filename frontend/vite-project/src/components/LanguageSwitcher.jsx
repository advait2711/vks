import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language;

    return (
        <div className="flex items-center gap-2 ml-4 md:my-0 my-4 md:justify-start justify-center md:p-0 p-2 md:bg-transparent bg-white/5 rounded-lg">
            <button
                className={`bg-transparent border-none text-gray-500 text-sm font-medium cursor-pointer py-1.5 px-3 rounded-md transition-all duration-300 hover:text-emerald-dark hover:bg-emerald-dark/10 ${currentLanguage === 'en' ? 'text-emerald-dark bg-emerald-dark/15 font-semibold' : ''}`}
                onClick={() => changeLanguage('en')}
                aria-label="Switch to English"
            >
                {t('language.english')}
            </button>
            <span className="text-gray-300 text-sm">|</span>
            <button
                className={`bg-transparent border-none text-gray-500 text-sm font-medium cursor-pointer py-1.5 px-3 rounded-md transition-all duration-300 hover:text-emerald-dark hover:bg-emerald-dark/10 ${currentLanguage === 'ml' ? 'text-emerald-dark bg-emerald-dark/15 font-semibold' : ''}`}
                onClick={() => changeLanguage('ml')}
                aria-label="Switch to Malayalam"
            >
                {t('language.malayalam')}
            </button>
        </div>
    );
};

export default LanguageSwitcher;
