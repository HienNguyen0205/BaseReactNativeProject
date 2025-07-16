import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from '@/i18n/vi.json'
import en from '@/i18n/en.json'

i18n.use(initReactI18next).init({
    resources: {
        vi: vi,
        en: en
    },
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false
    }
})