module.exports = {
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'en'],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/public/locales',
};
