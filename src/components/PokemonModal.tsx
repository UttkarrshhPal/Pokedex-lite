"use client";

import { Dialog } from "@headlessui/react";
import { Pokemon } from "@/types/pokemon";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PokemonImage } from "./PokemonImage";
import { motion } from "framer-motion";

interface PokemonModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

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

const StatBar: React.FC<{ name: string; value: number }> = ({
  name,
  value,
}) => {
  const percentage = (value / 255) * 100; // 255 is max possible stat value
  const getStatColor = (value: number) => {
    if (value >= 150) return "bg-green-500";
    if (value >= 90) return "bg-blue-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {name}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {value}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-2.5 rounded-full ${getStatColor(value)}`}
        />
      </div>
    </div>
  );
};

export const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  isOpen,
  onClose,
}) => {
  if (!pokemon) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          {/* Header with gradient background */}
          <div
            className={`relative p-6 ${
              typeColors[pokemon.types[0].type.name]
            } bg-gradient-to-br from-opacity-50 to-opacity-100`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white hover:opacity-80 transition-opacity"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="text-white mb-4">
              <p className="text-sm font-medium opacity-80">
                #{pokemon.id.toString().padStart(3, "0")}
              </p>
              <h2 className="text-3xl font-bold capitalize mb-2">
                {pokemon.name}
              </h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-white/20"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative h-48 w-48 mx-auto mt-4 mb-[-96px]">
              <PokemonImage
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                sizes="192px"
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Body content */}
          <div className="p-6 pt-24 bg-white dark:bg-gray-800">
            {/* Stats */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Base Stats
              </h3>
              {pokemon.stats.map((stat) => (
                <StatBar
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                />
              ))}
            </div>

            {/* Abilities */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Abilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 capitalize"
                  >
                    {ability.ability.name.replace("-", " ")}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional details could go here */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Height
                  </p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {pokemon.height / 10} m
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Weight
                  </p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {pokemon.weight / 10} kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
