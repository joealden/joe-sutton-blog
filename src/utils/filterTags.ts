/**
 * Used in following component files:
 * - `src/desktop/Filter.tsx`
 * - `src/mobile/TagSearch/tsx`
 */

export const filterTags = (tags: Array<string>, searchValue: string) =>
  tags.filter(tag => {
    const lowercaseTag = tag.toLowerCase();
    const lowercaseSearchValue = searchValue.trim().toLowerCase();

    /**
     * Matches the start of words, for example:
     *
     * 'ha'/'ne' matches 'Neue Haas'.
     * 'est' does not match "Testing".
     */
    return (
      lowercaseTag.startsWith(lowercaseSearchValue) ||
      lowercaseTag.includes(` ${lowercaseSearchValue}`)
    );
  });
