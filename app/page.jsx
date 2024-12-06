// import StyleGuide from "@/components/StyleGuide";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Reservation from "../components/Reservation";

export default function Home() {
  return (
    <main className="w-full  bg-white mx-auto overflow-hidden">
      {/* <StyleGuide /> */}
      <Hero />
      <Menu />
      <Reservation />
    </main>
  );
}
