import axios from "axios";

export const fetchPokemon = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
};
