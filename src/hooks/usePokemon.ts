// import { useState, useEffect } from "react";
// import { fetchPokemon } from "../utils/fetchPokemon";

// const API_URL = "https://pokeapi.co/api/v2/pokemon";

// export const usePokemon = (page: number, limit: number) => {
//   const [pokemonList, setPokemonList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const offset = (page - 1) * limit;
//         const data = await fetchPokemon(`${API_URL}?offset=${offset}&limit=${limit}`);
//         setPokemonList(data.results);
//       } catch (err) {
//         setError("Failed to fetch Pokémon");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [page, limit]);

//   return { pokemonList, loading, error };
// };

import { useState, useEffect } from "react";

const usePokemon = (page: number) => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchPokemonData = async () => {
      try {
        const offset = (page - 1) * 20; // 20 Pokémon per page
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        setError("Failed to fetch Pokémon data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [page]); // Re-fetch when page number changes

  return { pokemonList, loading, error };
};

export default usePokemon;
