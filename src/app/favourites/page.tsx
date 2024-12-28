/**
 *
 * Using UK type english
 * hence the spelling of favourite would be this way
 * instead of favorite which is a US type english
 *
 * To maintain this in all the files, especially in navbar links and page buttons
 */

"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pokemon } from "@/types/pokemon";
import { useFavorites } from "@/context/FavouritesContext";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonModal } from "@/components/PokemonModal";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch details for all favorite Pokemon
  const { data: favoritePokemon, isLoading } = useQuery({
    queryKey: ["favoritePokemon", favorites],
    queryFn: async () => {
      if (favorites.length === 0) return [];
      const pokemonDetails = await Promise.all(
        favorites.map((id) =>
          axios
            .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.data)
        )
      );
      return pokemonDetails;
    },
  });

  const filteredPokemon = useMemo(() => {
    let result = [...(favoritePokemon || [])];
    if (searchedTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchedTerm.toLowerCase())
      );
    }
    if (selectedType) {
      result = result.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)
      );
    }
    return result;
  }, [favoritePokemon, searchedTerm, selectedType]);

  // Render empty state if no favorites
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />
        <main className="flex-grow flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <Image
                src="/sad-pikachu.png" // Add this image to your public folder
                alt="No favorites"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Favorite Pokémon Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start collecting your favorite Pokémon by clicking the star icon
              on any Pokémon card!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Explore Pokémon
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Favorite Pokémon
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have {favorites.length} favorite Pokémon
          </p>
        </div>

        <SearchBar
          searchedTerm={searchedTerm}
          selectedType={selectedType}
          onSearchChange={setSearchedTerm}
          onTypeChange={setSelectedType}
        />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent" />
          </div>
        ) : (
          <>
            {filteredPokemon && filteredPokemon.length > 0 ? (
              <div
                className={`
                ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "flex flex-col gap-4"
                }
              `}
              >
                {filteredPokemon.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={() => setSelectedPokemon(pokemon)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No Pokémon match your search criteria
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <PokemonModal
        pokemon={selectedPokemon}
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}
