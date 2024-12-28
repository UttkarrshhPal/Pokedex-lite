/**
 * @DONE:
 * - Fetch list of pokemons from API
 * - Fetch details of each pokemon
 * - Display list of pokemons
 * - Added search functionality
 * - Added type filter
 * - Added pagination
 * - Added view mode toggle
 * - Added keyboard navigation
 * - Added modal for detailed view
 * - Added loading skeleton
 * - Added error boundary
 * - Added dark mode
 *
 * @TODO:
 * - Add error handling for API failures
 * - Fix mobile layout issues
 * - Optimize image loading
 * - Add unit testing for react
 */

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pokemon, PokemonListResponse } from "@/types/pokemon";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonModal } from "@/components/PokemonModal";
import { Pagination } from "@/components/Pagination";
import { Footer } from "@/components/Footer";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const ITEMS_PER_PAGE = 20;
export default function Home() {
  const [page, setPage] = useState(1);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: pokemonList, isLoading } = useQuery<PokemonListResponse>({
    queryKey: ["pokemonList", page],
    queryFn: async () => {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
      );
      return response.data;
    },
  });

  const { data: pokemonDetails } = useQuery({
    queryKey: ["pokemonDetails", pokemonList?.results],
    queryFn: async () => {
      if (!pokemonList?.results) return [];
      const details = await Promise.all(
        pokemonList.results.map((pokemon) =>
          axios.get<Pokemon>(pokemon.url).then((res) => res.data)
        )
      );
      return details;
    },
    enabled: !!pokemonList?.results,
  });

  const filteredPokemon = pokemonDetails?.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchedTerm.toLowerCase());
    const matchesType =
      !selectedType ||
      pokemon.types.some((type) => type.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  // Calculate total pages
  const totalPages = pokemonList
    ? Math.ceil(pokemonList.count / ITEMS_PER_PAGE)
    : 0;

  useKeyboardNavigation(page, totalPages, setPage); // make sure to keep above the variable rendering
  // to avoid reseting of the context tree.

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
        <Navbar viewMode={viewMode} onViewModeChange={setViewMode} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex-grow">
          <SearchBar
            searchedTerm={searchedTerm}
            selectedType={selectedType}
            onSearchChange={setSearchedTerm}
            onTypeChange={setSelectedType}
          />

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div
                className={`
                ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "flex flex-col gap-4"
                }
              `}
              >
                {filteredPokemon?.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={() => setSelectedPokemon(pokemon)}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}
        </main>

        <PokemonModal
          pokemon={selectedPokemon}
          isOpen={!!selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
