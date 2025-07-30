
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button onClick={() => changeLanguage('en')} className={`btn ${i18n.language === 'en' ? 'btn-primary' : ''}`}>English</button>
      <button onClick={() => changeLanguage('ar')} className={`btn ${i18n.language === 'ar' ? 'btn-primary' : ''}`}>العربية</button>
    </div>
  );
}
