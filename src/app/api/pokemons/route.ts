import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

const TOTAL_POKEMON = 151;

export const GET = async (_: Request): Promise<NextResponse> => {
  //Request => 이 함수는 Request 타입의 매개변수를 받지만, 함수 내에서 사용하지 않을 것이다"라는 의미.
  //Next.js의 API 라우트나 서버리스 함수에서 흔히 볼 수 있는 패턴
  //함수가 요청 객체를 받아야 하지만 실제로는 사용하지 않을 때

  try {
    const allPokemonPromises = Array.from(
      { length: TOTAL_POKEMON },
      (_, index) => {
        const id = index + 1;
        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      }
    );

    const allPokemonResponses: [AxiosResponse, AxiosResponse][] =
      await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse], index) => {
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
