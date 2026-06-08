"use client";

import BranchPage from "@/app/components/BranchPage";
import cityWalkTrans from "../translation/cityWalkTrans.js";

const images = [
  { image: "/city-walk/ct1.jpg" },
  { image: "/city-walk/ct2.jpg" },
  { image: "/city-walk/ct3.jpg" },
  { image: "/city-walk/ct4.jpg" },
  { image: "/city-walk/ct5.jpg" },
  { image: "/city-walk/ct6.jpg" },
  { image: "/city-walk/ct7.jpg" },
  { image: "/city-walk/ct8.jpg" },
];

const Page = () => (
  <BranchPage
    translations={cityWalkTrans}
    images={images}
    mapHref="https://maps.app.goo.gl/1DLEdMzpDd3uvDRj7"
    phone="+9710586903040"
    alt="Meat Moot City Walk"
  />
);

export default Page;
