import { writable, get } from 'svelte/store';
const deckMockup = [
  {
    color: 'Sapphire',
    cost: 4,
    fullName: 'Vault Door',
    inkwell: true,
    id: 603,
  },
  {
    color: 'Steel',
    cost: 4,
    fullName: 'And Then Along Came Zeus',
    inkwell: false,
    id: 631,
  },
];

const deck = writable(deckMockup);

function addCard(card) {}

function removeCard(card) {}

export default {
  subscribe: deck.subscribe,
  length: get(deck).length,
  add: addCard,
  remove: removeCard,
};
