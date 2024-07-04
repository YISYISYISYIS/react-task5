import { Pokemon } from "@/types/pokemon";

export const fetchPokemonData = async (id: string): Promise<Pokemon> => {
  const apiUrl = "http://localhost:3000";
  const response = await fetch(`${apiUrl}/api/pokemons/${id}`);
  return response.json();
};
