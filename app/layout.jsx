import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Head from "next/head";
import { AppWrapper } from "./context";
import { cookies } from "next/headers"; // Import to access cookies

const geistSans = localFont({
  src: "./fonts/framd.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export async function generateMetadata() {
  // Access cookies asynchronously
  const cookieStore = await cookies(); // Await the cookies function
  const language = cookieStore.get("language")?.value || "en"; // Default to 'en' if not found

  const metadata = {
    title: language === "ar" 
      ? "میت موت | أفضل لحوم مدخنة في الإمارات"
      : language === "ru"
      ? "Мит Мут | Лучшая копченая мясо в ОАЭ"
      : "Meat Moot | Best Smoked Meat in UAE",
    description: language === "ar"
      ? "مرحبًا بكم في ميت موت، حيث يلتقي الطعام بالكمال! نقدم أفضل اللحوم المدخنة في الإمارات، مصنوعة من أفضل القطع والمطهوة ببطء حتى الكمال المدخن والطري."
      : language === "ru"
      ? "Добро пожаловать в Мит Мут, где еда встречает совершенство! Мы предлагаем лучшее копченое мясо в ОАЭ, приготовленное из высококачественных кусков и медленно готовое до копченой, нежной идеальности."
      : "Welcome to Meat Moot, where food meets perfection! We offer the best smoked meat in the UAE, crafted from premium cuts and slow-cooked to smoky, tender perfection.",
    icons: {
      icon: "/logo.svg",
    },
  };

  return metadata;
}

export default async function RootLayout({ children }) {
  // Access cookies directly from the request headers
  const cookieStore = await cookies(); // Await the cookies function
  const language = cookieStore.get("language")?.value || "en"; // Default to 'en' if not found
  const dir = language === "ar" ? "rtl" : language === "ru" ? "ltr" : "ltr"; // Set direction based on language

  return (
    <html lang={language} dir={dir}>
      <Head>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <body className={`${geistSans.variable} antialiased`}>
        <AppWrapper>
          <Header />
          {children}
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
