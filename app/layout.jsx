import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/framd.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Meat Moot | Best Smoked Meat in UAE",
  description:
    "Welcome to Meat Moot, where food meets perfection! We offer the best smoked meat in the UAE, crafted from premium cuts and slow-cooked to smoky, tender perfection. Whether you're a meat enthusiast or a food lover, our dishes promise an unforgettable culinary experience. Discover the art of smoked meat at Meat Moot today!",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
