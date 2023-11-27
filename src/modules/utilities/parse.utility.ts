export const parseWordSubstring = (word: string, length: number): string => {
  if (word.length > length) {
    return word.substring(0, length).concat("...");
  } else {
    return word;
  }
};
