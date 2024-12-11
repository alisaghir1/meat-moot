// import StyleGuide from "@/components/StyleGuide";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Reservation from "../components/Reservation";
import Celebrities from "@/components/Celebrities";

export default function Home() {
  return (
    <main className="w-full  bg-white mx-auto overflow-hidden">
      {/* <StyleGuide /> */}
      <Hero />
      <Celebrities />
      <Menu />
      <Reservation />
    </main>
  );
}
