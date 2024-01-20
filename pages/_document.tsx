import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import i18nextConfig from '../next-i18next.config';
import { useTranslation } from 'react-i18next';

type Props = DocumentProps;

export default function Document(props: Props) {
  //  props.__NEXT_DATA__.locale
  const { i18n } = useTranslation();
  const currentLocale = i18n.language ?? i18nextConfig.i18n.defaultLocale;
  console.log('currentLocale ', currentLocale);

  return (
    <Html lang={currentLocale} dir={currentLocale === 'fa' ? 'rtl' : 'ltr'}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Chatbot UI"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
