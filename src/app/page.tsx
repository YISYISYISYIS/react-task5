import Image from "next/image";
import PokemonList from "@/component/PokemonList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PokemonList />
    </main>
  );
}
