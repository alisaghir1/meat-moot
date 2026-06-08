'use client';

import BranchPage from '@/app/components/BranchPage';
import jbrTrans from '../translation/jbrTrans.js';

const images = [
  { image: '/jbr/jb1.jpg' },
  { image: '/jbr/jb2.jpg' },
  { image: '/jbr/jb3.jpg' },
  { image: '/jbr/jb4.jpg' },
  { image: '/jbr/jb5.jpg' },
  { image: '/jbr/jb6.jpg' },
  { image: '/jbr/jb7.jpg' },
  { image: '/jbr/jb8.jpg' },
];

const Page = () => (
  <BranchPage
    translations={jbrTrans}
    images={images}
    mapHref="https://maps.app.goo.gl/cNBPgSUiT8mog4HFA"
    phone="+9710509915567"
    alt="Meat Moot JBR"
  />
);

export default Page;
