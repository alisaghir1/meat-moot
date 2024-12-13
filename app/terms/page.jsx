'use client'
import termsTrans from "../translation/termsTrans.js";
import { useAppContext } from "../context";
import Head from "next/head";

const Terms = () => {
  const [ language ] = useAppContext();
  const terms = termsTrans[language];

  return (
    <section className="bg-customText2 text-orange mt-20">
      <Head>
        <title>{terms.title}</title>
        <meta name="description" content="Privacy Policy of Meat Moot" />
      </Head>
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="mt-20">{terms.title}</h1>
        <p className="text-white">{terms.introduction}</p>
        {Object.values(terms.sections).map((section, index) => (
          <section key={index} className="section mb-12 mt-10">
            <h2>{section.title}</h2>
            {section.content.map((paragraph, idx) => (
              <p className="text-white" key={idx}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </section>
  );
};

export default Terms;
