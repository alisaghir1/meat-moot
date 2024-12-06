import React from "react";
import Head from "next/head";

const terms = () => {
  return (
    <section className="bg-customText2 text-orange">
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="privacy policy of Meat moot" />
      </Head>
      <div className="container mx-auto p-4 md:p-8">
        <section className="terms-content">
          <h1 className="mt-40 text-3xl md:text-4xl font-bold text-center mb-6 custom-font text-customText@">
            Privacy Policy
          </h1>

          <p className="text-lg text-center text-white mb-8 font-mono">
            Thank you for viewing Meat Moot’s (“MeatMoot’s,” “our,” “us,” “we”)
            privacy policy. This privacy policy applies to consumers visiting
            our restaurants using the Meatmoot’s website (meatmoot.com.tr). By
            using the MeatMoot’s website, you agree to our Terms and Conditions
            and consent to MeatMoot’s information collection, use, and
            disclosure practices, and other activities as described in this
            privacy policy. If you do not agree and consent, please discontinue
            use of the MeatMoot’s services.
          </p>

          <section className="section mb-12">
            <h2 className="text-2xl font-semibold mb-4 custom-font">
              Information Collection
            </h2>
            <p className="text-base text-white leading-relaxed font-mono">
              When you use our services, we, or service providers acting on our
              behalf, may collect your information. This generally happens in
              one of three ways – you provide us with information, we collect
              information through automated methods, or we collect information
              from other sources.
            </p>
            <p className="text-base text-white leading-relaxed font-mono mt-5">
              There are some situations in which it is necessary for us to
              collect your information in order to provide a service to you or
              to meet legal requirements. Rest assured, when you share your
              information with us, we only use it to give you a great MeatMoot’s
              experience.
            </p>
            <p className="text-base text-white leading-relaxed font-mono mt-5">
              We may contact you via email in the future to tell you about
              specials, new products or services, or changes to this privacy
              policy.
            </p>
          </section>

          <section className="section mb-12">
            <h2 className="text-2xl font-semibold mb-4 custom-font">
              Information Use
            </h2>
            <p className="text-base text-white leading-relaxed font-mono">
              We use the collected information for various purpose such as
              improving our operations and providing you with our services,
              generating analytics, and for fraud prevention and legal purposes
              – all of which help us provide you with a better Meatmoot’s
              experience and learn how consumers interact with our services.
            </p>
          </section>

          <section className="section mb-12">
            <h2 className="text-2xl font-semibold mb-4 custom-font">
              Security
            </h2>
            <p className="text-base text-white leading-relaxed font-mono">
              To protect the information submitted to us, we adhere to generally
              accepted industry standards both during transmission and once we
              receive it.
            </p>
            <p className='className="text-base text-white leading-relaxed font-mono mt-5'>
              If we collect sensitive information (such as credit card
              information), it is encrypted and securely transmitted to us. You
              can check this by looking for a closed lock icon at the bottom of
              your web browser or “https” at the beginning of the web page’s
              address.
            </p>

            <p className='className="text-base text-white leading-relaxed font-mono mt-5'>
              While encryption is used to protect sensitive information
              transmitted online, your information is also protected offline
            </p>
            <p className="text-base text-white leading-relaxed font-mono">
              Hyperlinks to other internet resources are at your own risk; the
              content, accuracy, opinions expressed, and other links provided by
              these resources are not investigated, verified, monitored, or
              endorsed by High Five Properties. This Exclusion clause shall take
              effect to the fullest extent permitted by all applicable law.
            </p>
          </section>

          <section className="section mb-12">
            <h2 className="text-2xl font-semibold mb-4 custom-font">
              How long do we retain your data?
            </h2>
            <p className="text-base text-white leading-relaxed font-mono">
              We keep the information you provide directly when subscribing in
              our systems for the duration of your membership on our website.
              The information you provide when subscribing to our newsletter is
              stored in our systems until you unsubscribe. Your IP address will
              be stored in our systems for one year. We keep the information you
              provide us directly for online product purchases in our systems
              for the duration of your subscription
            </p>
          </section>

          <section className="section mb-12">
            <h2 className="text-2xl font-semibold mb-4 custom-font">
              Links
            </h2>
            <p className="text-base text-white leading-relaxed font-mono">
            This Website may contain links to other sites. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information
            </p>
          </section>

          <section className="section mb-12">
            <h2 className="text-2xl font-semibold mb-4 custom-font">
            Disclosure of personal information
            </h2>
            <p className="text-base text-white leading-relaxed font-mono">
            Meatmoot will not disclose personal data without consent except when required by law, to prevent and detect crime and to produce anonymised statistics.
            </p>
            <p className="text-base text-white leading-relaxed font-mono">
              High Five Properties does not undertake to update any of these
              forward-looking statements.
            </p>
          </section>

          <section className="section mb-12">
            <h2 className="text-2xl font-semibold mb-4 custom-font">
            Children’s Privacy
            </h2>
            <p className="text-base text-white leading-relaxed font-mono">
            Our Service does not address anyone under the age of 18 (“Children”). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
            </p>
          </section>

          <section className="section mb-12">
            <h2 className="text-2xl font-semibold mb-4 custom-font">Contact Us</h2>
            <p className="text-base text-white leading-relaxed font-mono">
            If you have any questions regarding this privacy policy you may email us or call our Customer Care line. We want to hear from you!.
            </p>
          </section>
        </section>
      </div>
    </section>
  );
};

export default terms;
