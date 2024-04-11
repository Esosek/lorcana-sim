import { writable } from 'svelte/store';

export const GameMode = {
  Sealed: 'Sealed',
  Draft: 'Draft',
};

export function pickGameMode(gameMode) {
  options.update((prevOptions) => {
    prevOptions.gameMode = gameMode;
    return { ...prevOptions };
  });
}

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
  gameMode: GameMode.Sealed,
};

const options = writable(defaultOptions);

export default options;
