"use client";

import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavouritesContext";
import { useTheme } from "@/context/ThemeContext";
import {
  StarIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

interface NavbarProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-red-600 dark:bg-red-800 fixed w-full z-50 top-0 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                <Image
                  src="/pokeball.png"
                  alt="Pokeball"
                  fill
                  sizes="32px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-white font-bold text-xl">Pokédex Lite</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-white/90 hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/favourites"
              className="text-white/90 hover:text-white px-3 py-2 rounded-md font-medium flex items-center transition-colors"
            >
              <StarIcon className="h-5 w-5 mr-1" />
              Favourites ({favorites.length})
            </Link>

            {/* View Mode Toggle */}
            <button
              onClick={() =>
                onViewModeChange(viewMode === "grid" ? "list" : "grid")
              }
              className="text-white/90 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              {viewMode === "grid" ? (
                <ListBulletIcon className="h-5 w-5" />
              ) : (
                <Squares2X2Icon className="h-5 w-5" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-white/90 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              {theme === "light" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() =>
                onViewModeChange(viewMode === "grid" ? "list" : "grid")
              }
              className="text-white/90 hover:text-white px-2 transition-colors"
            >
              {viewMode === "grid" ? (
                <ListBulletIcon className="h-5 w-5" />
              ) : (
                <Squares2X2Icon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="text-white/90 hover:text-white px-2 transition-colors"
            >
              {theme === "light" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/90 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-red-600 dark:bg-red-800">
            <Link
              href="/"
              className="text-white/90 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/favourites"
              className="text-white/90 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <StarIcon className="h-5 w-5 mr-1" />
              Favourites ({favorites.length})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
