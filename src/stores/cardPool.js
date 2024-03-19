import { writable, get } from 'svelte/store';
import sortOptions, { SortOptions, RarityTable } from './sortOptions';

const cardPool = writable([]);

function set(cards) {
  sort(cards, get(sortOptions));
  cardPool.set(cards);
}

function sort(cards, options) {
  if (options.sortBy === SortOptions.Ink) {
    if (options.ascending) {
      cards.sort((a, b) => a.cost - b.cost);
    } else {
      cards.sort((a, b) => b.cost - a.cost);
    }
  } else if (options.sortBy === SortOptions.Rarity) {
    if (options.ascending) {
      cards.sort((a, b) => RarityTable[a.rarity] - RarityTable[b.rarity]);
    } else {
      cards.sort((a, b) => RarityTable[b.rarity] - RarityTable[a.rarity]);
    }
  }
}

function add(card) {
  cardPool.update((prevPool) => {
    const cardIndex = prevPool.findIndex((c) => c.id === card.id);
    if (cardIndex !== -1) {
      prevPool[cardIndex].quantity++;
      return prevPool;
    } else {
      prevPool.push({ ...card, quantity: 1 });
      sort(prevPool, get(sortOptions));
      return prevPool;
    }
  });
}

function remove(cardId) {
  cardPool.update((prevPool) => {
    const cardIndex = prevPool.findIndex((c) => c.id === cardId);
    if (cardIndex !== -1) {
      const poolCard = prevPool[cardIndex];
      poolCard.quantity--;
      if (poolCard.quantity <= 0) {
        prevPool.splice(cardIndex, 1);
      }
    }
    return prevPool;
  });
}

sortOptions.subscribe((options) => {
  sort(get(cardPool), options);
});

export default {
  subscribe: cardPool.subscribe,
  set,
  add,
  remove,
};
