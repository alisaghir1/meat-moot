import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { AppWrapper } from "./context";
import { cookies } from "next/headers"; // Import to access cookies
import Script from "next/script";

const franklin = localFont({
  src: "./fonts/framd.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const antique = localFont({
  src: "./fonts/11120.ttf",
  variable: "--font-antique",
  weight: "100 900",
});

export async function generateMetadata() {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "en";

  const metadata = {
    title:
      language === "ar"
        ? "میت موت | أفضل لحوم مدخنة في الإمارات | تجربة طعام لا مثيل لها في دبي وأبوظبي"
        : language === "ru"
        ? "Мит Мут | Лучшая копченая мясо в ОАЭ | Уникальный опыт для гурманов в Дубае и Абу-Даби"
        : "Meat Moot | Best Smoked Meat in UAE | An Unmatched Dining Experience in Dubai & Abu Dhabi",
    description:
      language === "ar"
        ? "مرحبًا بكم في ميت موت، حيث يلتقي الطعام بالكمال! نقدم أفضل اللحوم المدخنة في الإمارات، مصنوعة من أفضل القطع والمطهوة ببطء حتى الكمال المدخن والطري. سواء كنت في دبي أو أبوظبي، نقدم لك تجربة طعام لا مثيل لها مع مجموعة واسعة من الأطباق المدخنة التي تناسب كل الأذواق."
        : language === "ru"
        ? "Добро пожаловать в Мит Мут, где еда встречает совершенство! Мы предлагаем лучшее копченое мясо в ОАЭ, приготовленное из высококачественных кусков и медленно готовое до копченой, нежной идеальности. Независимо от того, находитесь ли вы в Дубае или Абу-Даби, мы предлагаем уникальный опыт с богатым выбором копченых блюд для настоящих гурманов."
        : "Welcome to Meat Moot, where food meets perfection! We offer the best smoked meat in the UAE, crafted from premium cuts and slow-cooked to smoky, tender perfection. Whether you're in Dubai or Abu Dhabi, we provide an unmatched dining experience with a wide selection of smoked dishes catering to every taste.",
    keywords:
      language === "ar"
        ? "میت موت, لحوم مدخنة, أفضل لحوم مدخنة, دبي, أبوظبي, تجربة طعام, لحوم شهية, مطاعم في الإمارات"
        : language === "ru"
        ? "Мит Мут, копченое мясо, лучшая копченая мясо, Дубай, Абу-Даби, кулинарный опыт, лучшие рестораны ОАЭ"
        : "Meat Moot, smoked meat, best smoked meat, Dubai, Abu Dhabi, dining experience, delicious meat, best restaurants UAE",
    icons: {
      icon: "/logo.svg",
    },
  };

  return metadata;
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const language = cookieStore.get("language")?.value || "en";
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <html lang={language} dir={dir}>
      <head>
        {/* Main Icon */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/logo.svg" />

        {/* Specify sizes for different devices */}
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.svg" />
        <link rel="icon" href="/logo.svg" />
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7HR8LLCZMW"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7HR8LLCZMW');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N846QXCV');
          `}
        </Script>
      </head>
      <body className={`${franklin.variable}${antique.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N846QXCV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AppWrapper>
          <Header />
          {children}
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
