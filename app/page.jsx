import Hero from "@/app/components/Hero";
import Menu from "@/app/components/Menu";
import Reservation from "@/app/components/Reservation";
import Celebrities from "@/app/components/Celebrities";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <Menu />
      <Celebrities />
      <Reservation />
    </main>
  );
}
