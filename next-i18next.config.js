module.exports = {
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'en', 'fr'],
    localeDetection: false,
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/public/locales',
};
