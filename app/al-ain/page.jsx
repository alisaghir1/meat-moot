'use client';

import BranchPage from '@/app/components/BranchPage';
import alAinTrans from '../translation/alAinTrans.js';

const images = [
  { image: '/al-ain/GAD_2300.jpg' },
  { image: '/al-ain/GAD_2321.jpg' },
  { image: '/al-ain/GAD_2325.jpg' },
  { image: '/al-ain/_M5A3112.JPG' },
  { image: '/al-ain/_M5A3142.JPG' },
  { image: '/al-ain/_M5A3191 (1).JPG' },
  { image: '/al-ain/_M5A3214 (1).JPG' },
  { image: '/al-ain/_M5A3233.JPG' },
  { image: '/al-ain/_M5A3235.JPG' },
  { image: '/al-ain/_M5A3245 (1).JPG' },
];

const Page = () => (
  <BranchPage
    translations={alAinTrans}
    images={images}
    mapHref="https://maps.app.goo.gl/GiraTRrf2JNzJ44s5"
    alt="Meat Moot Al Ain"
  />
);

export default Page;
