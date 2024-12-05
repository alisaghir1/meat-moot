// import StyleGuide from "@/components/StyleGuide";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Menu from "@/components/Menu";

export default function Home() {
  return (
    <main className="w-full  bg-white mx-auto overflow-hidden">
      {/* <StyleGuide /> */}
      <Header />
      <Hero />
      <Menu />
      <div className="h-[4000px]"></div>
    </main>
  );
}
