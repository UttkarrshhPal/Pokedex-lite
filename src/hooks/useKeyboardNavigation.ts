import { useEffect } from 'react';

export const useKeyboardNavigation = (
  thisPage: number,
  totalPages: number,
  onPageChange: (page: number) => void
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && thisPage > 1) {
        onPageChange(thisPage - 1);
      } else if (event.key === 'ArrowRight' && thisPage < totalPages) {
        onPageChange(thisPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [thisPage, totalPages, onPageChange]);
};