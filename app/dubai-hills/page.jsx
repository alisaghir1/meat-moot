'use client';

import BranchPage from '@/app/components/BranchPage';
import dubaiHillsTrans from '../translation/dubaiHillsTrans.js';

const images = [
  { image: '/dubai-hills/db1.jpg' },
  { image: '/dubai-hills/db2.jpg' },
  { image: '/dubai-hills/db3.jpg' },
  { image: '/dubai-hills/db4.jpg' },
  { image: '/dubai-hills/db5.jpg' },
  { image: '/dubai-hills/db6.jpg' },
  { image: '/dubai-hills/db7.jpg' },
  { image: '/dubai-hills/db8.jpg' },
];

const Page = () => (
  <BranchPage
    translations={dubaiHillsTrans}
    images={images}
    mapHref="https://maps.app.goo.gl/LtWYcLpVERud56WT6"
    phone="+9710581264843"
    alt="Meat Moot Dubai Hills"
  />
);

export default Page;
