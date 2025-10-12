/**
 * Utility functions for extracting initials from names
 */

/**
 * Extracts initials from a full name
 * @param fullName - The full name to extract initials from
 * @returns The initials (up to 2 characters)
 */
export function getInitials(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') {
    return '??';
  }

  const words = fullName.trim().split(/\s+/);
  
  if (words.length === 0) {
    return '??';
  }
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  // Take first letter of first and last word
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/**
 * Extracts initials from a display name or username
 * @param display - The display name or username
 * @returns The initials (up to 2 characters)
 */
export function getInitialsFromDisplay(display: string): string {
  return getInitials(display);
}
