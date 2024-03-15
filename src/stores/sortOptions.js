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
};

const sortOptions = writable(defaultOptions);

const sortBy = (value) => {
  sortOptions.update((prevState) => ({
    ...prevState,
    sortBy: value,
  }));
};

const setAscending = (value) => {
  sortOptions.update((prevState) => ({
    ...prevState,
    ascending: value,
  }));
};

export default {
  subscribe: sortOptions.subscribe,
  sortBy,
  setAscending,
};
