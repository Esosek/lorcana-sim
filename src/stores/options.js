import { writable } from 'svelte/store';

// Numeric table for sorting purposes
export const RarityTable = {
  Enchanted: 0,
  Legendary: 1,
  Super: 2,
  Rare: 3,
  Uncommon: 4,
  Common: 5,
};

export const SortOptions = {
  Ink: 'Ink',
  Rarity: 'Rarity',
};

const defaultOptions = {
  sortBy: SortOptions.Ink,
  ascending: true,
  isBuilding: false,
};

const options = writable(defaultOptions);

export default options;
