import { writable, get } from 'svelte/store';
import sortOptions, { SortOptions, RarityTable } from './sortOptions';

const cardPool = writable([]);

sortOptions.subscribe((newValue) => {
  const cards = get(cardPool);
  sort(cards, newValue);
  cardPool.set(cards);
});

function set(cards) {
  sort(cards, get(sortOptions));
  cardPool.set(cards);
}

function sort(cards, options) {
  switch (options.sortBy) {
    case SortOptions.Ink:
      sortByInk(cards, options.ascending);
      break;
    case SortOptions.Rarity:
      sortByRarity(cards, options.ascending);
    default:
      break;
  }

  function sortByInk(cards, isAscending) {
    cards.sort((a, b) => {
      const costDif = a.cost - b.cost;
      if (costDif === 0) {
        return a.fullName < b.fullName ? -1 : 1;
      }
      return isAscending ? costDif : -costDif;
    });
  }

  function sortByRarity(cards, isAscending) {
    cards.sort((a, b) => {
      const rarityDif = RarityTable[a.rarity] - RarityTable[b.rarity];
      if (rarityDif === 0) {
        return a.fullName < b.fullName ? -1 : 1;
      }
      return isAscending ? rarityDif : -rarityDif;
    });
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
