import localFont from 'next/font/local';

export const yekanBakh = localFont({
  src: [
    {
      path: '../../public/fonts/yekan-bakh/YekanBakhFaNum-Thin.woff2',

      weight: '100',

      style: 'normal',
    },

    {
      path: '../../public/fonts/yekan-bakh/YekanBakhFaNum-Light.woff2',

      weight: '300',

      style: 'normal',
    },

    {
      path: '../../public/fonts/yekan-bakh/YekanBakhFaNum-Regular.woff2',

      weight: '400',

      style: 'normal',
    },

    {
      path: '../../public/fonts/yekan-bakh/YekanBakhFaNum-SemiBold.woff2',

      weight: '600',

      style: 'normal',
    },

    {
      path: '../../public/fonts/yekan-bakh/YekanBakhFaNum-Bold.woff2',

      weight: '700',

      style: 'normal',
    },

    {
      path: '../../public/fonts/yekan-bakh/YekanBakhFaNum-ExtraBold.woff2',

      weight: '800',

      style: 'normal',
    },

    {
      path: '../../public/fonts/yekan-bakh/YekanBakhFaNum-Black.woff2',

      weight: '900',

      style: 'normal',
    },
  ],

  variable: '--font-yekanBakh',
});

export const roboto = localFont({
  src: [
    {
      path: '../../public/fonts/roboto/Roboto-Regular.ttf',

      weight: '400',

      style: 'normal',
    },

    {
      path: '../../public/fonts/roboto/Roboto-Medium.ttf',

      weight: '500',

      style: 'normal',
    },

    {
      path: '../../public/fonts/roboto/Roboto-Bold.ttf',

      weight: '700',

      style: 'normal',
    },
  ],

  variable: '--font-roboto',
});
