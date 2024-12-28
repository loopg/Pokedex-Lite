

import React, { useState } from "react";
import { motion } from "framer-motion";
import PokemonCard from "../components/PokemonCard";
import usePokemon from "../hooks/usePokemon"; 
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<any | null>(null);

  const { pokemonList, loading, error } = usePokemon(page);

  const fetchPokemonDetails = async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      const formattedData = {
        name: data.name,
        image: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
        height: data.height,
        weight: data.weight,
        stats: data.stats.map((stat: any) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })),
        abilities: data.abilities.map((ability: any) => ability.ability.name),
      };

      setPokemonDetails(formattedData);
    } catch (error) {
      console.error("Failed to fetch Pokémon details", error);
    }
  };

  const handlePokemonClick = (name: string) => {
    setSelectedPokemon(name);
    fetchPokemonDetails(name); 
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setPokemonDetails(null); 
  };

  return (
    <div className="container">
      {loading && <p>Loading Pokémon...</p>}
      {error && <p>{error}</p>}

      {/* Pokémon grid */}
      <motion.div
        className="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {pokemonList.map((pokemon: any) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            image={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
            onClick={() => handlePokemonClick(pokemon.name)}
          />
        ))}
      </motion.div>

      {/* Pagination controls */}
      <Pagination page={page} setPage={setPage} />

      {/* Modal to show selected Pokémon's details */}
      <Modal show={!!selectedPokemon} onClose={closeModal}>
        {pokemonDetails ? (
          <>
            <h1>{pokemonDetails.name}</h1>
            <img
              src={pokemonDetails.image}
              alt={pokemonDetails.name}
            />
            <p>Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
            <h2>Stats:</h2>
            <ul>
              {pokemonDetails.stats.map((stat: any) => (
                <li key={stat.name}>
                  {stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
            <h2>Abilities:</h2>
            <ul>
              {pokemonDetails.abilities.map((ability: string) => (
                <li key={ability}>{ability}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Loading details...</p>
        )}
      </Modal>
    </div>
  );
};

export default Home;
// ----------------------------------- Baad me dekhna hai isko ek aur baar sahi se fetch ni ho rha pata nahi kyu 😢😢

