// import StyleGuide from "@/components/StyleGuide";
import Hero from "@/components/Hero";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="w-full  bg-white mx-auto overflow-hidden">
      {/* <StyleGuide /> */}
      <Header />
      <Hero />
      <div className="h-[4000px]"></div>
    </main>
  );
}
