"use client";

import { motion } from "framer-motion";
import { Pokemon } from "@/types/pokemon";
import { useFavorites } from "@/context/FavouritesContext";
import { StarIcon } from "@heroicons/react/24/solid";
import { PokemonImage } from "@/components/PokemonImage";
// import { useState } from "react";

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-600",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-400",
};

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  viewMode: "grid" | "list";
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onClick,
  viewMode,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
//   const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <>
      <div className="absolute top-2 right-2 z-10">
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemon.id);
          }}
          className={`p-1.5 rounded-full transition-all
            ${
              isFavorite(pokemon.id)
                ? "bg-yellow-400/90 hover:bg-yellow-400 shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
        >
          <StarIcon
            className={`w-5 h-5 ${
              isFavorite(pokemon.id)
                ? "text-white"
                : "text-gray-400 dark:text-gray-300"
            }`}
          />
        </motion.button>
      </div>

      <div className={`${viewMode === "list" ? "flex items-center" : ""}`}>
        <div
          className={`
          relative 
          ${viewMode === "grid" ? "w-full pt-[100%]" : "w-24 h-24"} 
          bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden
        `}
        >
          <PokemonImage
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`
    object-contain 
    transform group-hover:scale-110 transition-transform duration-200
  `}
          />
        </div>

        <div
          className={`
          ${viewMode === "grid" ? "mt-4" : "ml-4 flex-1"}
        `}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
          <h2 className="ext-xl font-bold capitalize mt-1 text-gray-900 dark:text-white">
            {pokemon.name}
          </h2>

          <div className="flex flex-wrap gap-2 mt-3">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`px-3 py-1 rounded-full text-sm text-white font-medium ${
                  typeColors[type.type.name] || "bg-gray-500"
                }`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: viewMode === "grid" ? 1.05 : 1.02 }}
      transition={{ duration: 0.2 }}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
        cursor-pointer relative group
        ${viewMode === "list" ? "w-full" : ""}
      `}
      onClick={onClick}
    >
      <div className={`p-4 ${viewMode === "list" ? "w-full" : ""}`}>
        {cardContent}
      </div>
    </motion.div>
  );
};
