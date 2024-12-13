// import StyleGuide from "@/components/StyleGuide";
import Hero from "@/app/components/Hero";
import Menu from "@/app/components/Menu";
import Reservation from "@/app/components/Reservation";
import Celebrities from "@/app/components/Celebrities";
import FirstSection from "./components/FirstSection";

export default function Home() {
  return (
    <main className="w-full  bg-white mx-auto overflow-hidden">
      {/* <StyleGuide /> */}
      <Hero />
      {/* <FirstSection /> */}
      <Celebrities />
      <Menu />
      <Reservation />
    </main>
  );
}
