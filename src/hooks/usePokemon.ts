// import { useState, useEffect } from "react";



//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//      );
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
        const offset = (page - 1) * 20; 
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
  }, [page]); 

  return { pokemonList, loading, error };
};

export default usePokemon;
