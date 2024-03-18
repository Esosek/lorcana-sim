import { writable } from 'svelte/store';

const deck = writable([]);

function addCard(card) {
  deck.update((prevDeck) => {
    const cardIndex = prevDeck.findIndex((c) => c.id === card.id);
    if (cardIndex !== -1) {
      prevDeck[cardIndex].quantity++;
    } else {
      prevDeck.push({ ...card, quantity: 1 });
    }

    prevDeck.sort((a, b) => a.cost - b.cost);
    return prevDeck;
  });
}

function removeCard(card) {
  deck.update((prevDeck) => {
    const cardIndex = prevDeck.findIndex((deckCard) => deckCard.id === card.id);
    if (cardIndex !== -1) {
      const deckCard = prevDeck[cardIndex];
      deckCard.quantity--;
      if (deckCard.quantity <= 0) {
        prevDeck.splice(cardIndex, 1);
      }
    }
    return prevDeck;
  });
}

export default {
  subscribe: deck.subscribe,
  add: addCard,
  remove: removeCard,
};
