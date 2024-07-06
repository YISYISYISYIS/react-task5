import { NextResponse } from "next/server";
import axios from "axios";
import { Pokemon } from "@/types/pokemon";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const response = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    // console.log(speciesResponse);
    const koreanName: Pokemon = speciesResponse.data.names?.find(
      (name: any) => name.language.name === "ko"
    );

    const typesWithKoreanNames = await Promise.all(
      response.data.types.map(async (type: any) => {
        const typeResponse = await axios.get(type.type.url);
        const koreanTypeName: Pokemon =
          typeResponse.data.names?.find(
            (name: any) => name.language.name === "ko"
          )?.name || type.type.name;
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      })
    );

    const abilitiesWithKoreanNames = await Promise.all(
      response.data.abilities.map(async (ability: any) => {
        const abilityResponse = await axios.get(ability.ability.url);
        const koreanAbilityName =
          abilityResponse.data.names?.find(
            (name: any) => name.language.name === "ko"
          )?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      })
    );

    const movesWithKoreanNames = await Promise.all(
      response.data.moves.map(async (move: any) => {
        const moveResponse = await axios.get(move.move.url);
        const koreanMoveName =
          moveResponse.data.names?.find(
            (name: any) => name.language.name === "ko"
          )?.name || move.move.name;
        return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
      })
    );

    const pokemonData: Pokemon = {
      ...response.data,
      korean_name: koreanName?.name || response.data.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
    };

    return NextResponse.json(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
