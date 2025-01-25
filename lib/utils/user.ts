// Type definition for user data
type UserData = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
};

/**
 * Gets the display name for a user based on available information
 * Prioritizes full name > username > email (partially hidden)
 * @param author - User data containing name, username, and email information
 * @returns Formatted display name or null if no valid data is available
 */
export function getAuthorDisplayName(author: UserData | null): string | null {
  if (!author) return null;

  if (author.firstName && author.lastName) {
    return `${author.firstName} ${author.lastName}`;
  }

  if (author.username) {
    return author.username;
  }

  if (author.email) {
    return author.email.split("@")[0]; // Show only the part before @ for privacy
  }

  return null;
}
