"use client";

interface SearchBarProps {
  searchedTerm: string;
  selectedType: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchedTerm,
  selectedType,
  onSearchChange,
  onTypeChange,
}) => {

    // @TODO: later to implement suggestions based on past   searches
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8 transition-colors">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Search Pokémon
          </label>
          <input
            id="search"
            type="text"
            placeholder="Enter Pokémon name..."
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     transition-colors"
            value={searchedTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="sm:w-48">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Filter by Type
          </label>
          <select
            id="type"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-red-500 focus:border-red-500 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     transition-colors"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
          </select>
        </div>
      </div>
    </div>
  );
};
