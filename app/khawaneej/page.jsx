'use client';

import BranchPage from '@/app/components/BranchPage';
import khawaneejTrans from '../translation/khawaneejTrans.js';

const images = [
  { image: '/khawaneej/kh1.jpg' },
  { image: '/khawaneej/kh2.jpg' },
  { image: '/khawaneej/kh3.jpg' },
  { image: '/khawaneej/kh4.jpg' },
  { image: '/khawaneej/kh5.jpg' },
  { image: '/khawaneej/kh6.jpg' },
  { image: '/khawaneej/kh7.jpg' },
  { image: '/khawaneej/kh8.jpg' },
];

const Page = () => (
  <BranchPage
    translations={khawaneejTrans}
    images={images}
    mapHref="https://maps.app.goo.gl/hkFzjodKg372pQhVA"
    phone="+9710581264843"
    alt="Meat Moot Khawaneej"
  />
);

export default Page;
