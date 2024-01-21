import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = { newLang: string };

export default function ChangeLanguage({ newLang }: Props) {
  const { i18n } = useTranslation();
  const router = useRouter();
  return (
    <button
      className="bg-green-800 text-white"
      onClick={() => {
        console.log(`lang is changing to ${newLang}`);
        i18n.changeLanguage('fr');
        router.replace(router.pathname, router.pathname, { locale: newLang });
        document.documentElement.setAttribute(
          'dir',
          newLang === 'fa' ? 'rtl' : 'ltr',
        );

        console.log(i18n.language);
      }}
    >
      change lang to {newLang}
    </button>
  );
}
