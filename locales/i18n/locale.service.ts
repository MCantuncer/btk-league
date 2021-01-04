import i18n from './i18n.config';

/**
 * LocaleService
 */

export class LocaleService {
  public i18nProvider: any;

  /**
   *
   * @param i18nProvider The i18n provider
   */
  constructor(i18nProvider: any) {
    this.i18nProvider = i18nProvider;
  }

  /**
   *
   * @returns {string} The current locale code
   */
  getCurrentLocale() {
    return this.i18nProvider.getLocale();
  }

  /**
   *
   * @returns string[] The list of available locale codes
   */
  getLocales() {
    return this.i18nProvider.getLocales();
  }

  /**
   *
   * @param locale The locale to set. Must be from the list of available locales.
   */
  setLocale(locale: any) {
    if (this.getLocales().indexOf(locale) !== -1) {
      this.i18nProvider.setLocale({ locale: locale });
    }
  }

  /**
   *
   * @param string String to translate
   * @param args Extra parameters
   * @returns {string} Translated string
   */
  translate(string: string, args = undefined) {
    return this.i18nProvider.__(string, args);
  }

  /**
   *
   * @param phrase Object to translate
   * @param count The plural number
   * @returns {string} Translated string
   */
  translatePlurals({ phrase, count }: { phrase: any; count: any }) {
    return this.i18nProvider.__n(phrase, count);
  }
}

export const lang = new LocaleService(i18n);
