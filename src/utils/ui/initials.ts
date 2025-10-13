/**
 * Utility function to extract initials from a display name
 */

export const getInitialsFromDisplay = (display: string): string => {
  if (!display) return '??';
  const words = display.split(' ').filter(Boolean); // Filter out empty strings
  if (words.length === 0) return '??';
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};