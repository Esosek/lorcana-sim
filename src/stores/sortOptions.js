import { writable } from 'svelte/store';

export const SortOptions = {
  Mana: 'Mana',
  Rarity: 'Rarity',
};

const defaultOptions = {
  sortBy: SortOptions.Mana,
  ascending: true,
};

const sortOptions = writable(defaultOptions);

const sortBy = (sortOption) => {
  sortOptions.update((value) => ({
    ...value,
    sortedBy: sortOption,
  }));
};

const setAscending = (value) => {
  sortOptions.update(() => ({
    ...value,
    ascending: value,
  }));
};

export default {
  subscribe: sortOptions.subscribe,
  sortBy,
  setAscending,
};
