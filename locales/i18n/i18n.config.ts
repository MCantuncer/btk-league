import * as i18n from 'i18n';
import * as path from "path";

export const i18nOptions = {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
    queryParameter: 'lang',
    directory: path.join( './locales'),
    objectNotation: true,
    escapeValue : false
};

i18n.configure(i18nOptions);
export default i18n;