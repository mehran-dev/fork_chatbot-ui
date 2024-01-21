import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import i18nextConfig from '../next-i18next.config';

type Props = DocumentProps;

export default function Document(props: Props) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
  console.log(
    '_document => props.__NEXT_DATA__.locale',
    props.__NEXT_DATA__.locale,
  );

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
