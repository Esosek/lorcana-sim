import { writable, get } from 'svelte/store';

const deck = writable([]);

function addCard(card) {}

function removeCard(card) {}

export default {
  subscribe: deck.subscribe,
  length: get(deck).length,
  add: addCard,
  remove: removeCard,
};
