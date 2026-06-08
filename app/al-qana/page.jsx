'use client';

import BranchPage from '@/app/components/BranchPage';
import alQanaTrans from '../translation/alQanaTrans.js';

const images = [
  { image: '/al-qana/aq1.jpg' },
  { image: '/al-qana/aq2.jpg' },
  { image: '/al-qana/aq3.jpg' },
  { image: '/al-qana/aq4.jpg' },
  { image: '/al-qana/aq5.jpg' },
  { image: '/al-qana/aq6.jpg' },
  { image: '/al-qana/aq7.jpg' },
  { image: '/al-qana/aq8.jpg' },
];

const Page = () => (
  <BranchPage
    translations={alQanaTrans}
    images={images}
    mapHref="https://maps.app.goo.gl/aaL1cHsTTQCRtoq3A"
    phone="+9710586903040"
    alt="Meat Moot Al Qana"
  />
);

export default Page;
