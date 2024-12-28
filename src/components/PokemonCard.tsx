// import React from "react";
// import { motion } from "framer-motion";

// const PokemonCard: React.FC<{ name: string; image: string; onClick: () => void }> = ({ name, image, onClick }) => {
//   const placeholderImage = "https://via.placeholder.com/100?text=Pokemon";

//   return (
//     <motion.div
//       className="pokemon-card"
//       whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
//       whileTap={{ scale: 0.95 }}
//       onClick={onClick}
//     >
//       <img src={image || placeholderImage} alt={name} />
//       <h3>{name}</h3>
//     </motion.div>
//   );
// };

// export default PokemonCard;

import React from "react";
import { motion } from "framer-motion";

const PokemonCard: React.FC<{ name: string; image: string; onClick: () => void }> = ({ name, image, onClick }) => {
  const placeholderImage = "https://via.placeholder.com/100?text=Pokemon";

  return (
    <motion.div
      className="pokemon-card"
      whileHover={{
        scale: 1.05, // Scale up the card when hovered
        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)", // Add shadow on hover
        transition: { duration: 0.3 }, // Smooth transition
      }}
      whileTap={{ scale: 0.95 }} // Slight scale down when clicked
      onClick={onClick}
    >
      <img src={image || placeholderImage} alt={name} />
      <h3>{name}</h3>
    </motion.div>
  );
};

export default PokemonCard;
