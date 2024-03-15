import { writable, get } from 'svelte/store';
import sortOptions, { SortOptions } from './sortOptions';

const cardPool = writable([]);

function set(cards) {
  sort(cards, get(sortOptions));
}

function sort(cards, options) {
  if (options.sortBy === SortOptions.Mana) {
    if (options.ascending) {
      cards.sort((a, b) => a.cost - b.cost);
    } else {
      cards.sort((a, b) => b.cost - a.cost);
    }
  } else if (options.sortBy === SortOptions.Rarity) {
  }

  cardPool.set(cards);
}

sortOptions.subscribe((options) => {
  sort(get(cardPool), options);
});

export default {
  subscribe: cardPool.subscribe,
  set,
};
