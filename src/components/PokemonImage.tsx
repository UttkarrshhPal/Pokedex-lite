"use client";

import Image from "next/image";
import { useState } from "react";

interface PokemonImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export const PokemonImage: React.FC<PokemonImageProps> = ({
  src,
  alt,
  fill = true,
  sizes,
  className = "",
  priority = false,
}) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
      >
        <span className="text-gray-400 dark:text-gray-500 text-sm">
          No image
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    //   console.error("Error loading image")
    />
  );
};
