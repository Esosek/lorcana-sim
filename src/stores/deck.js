import { writable, get } from 'svelte/store';
const deckMockup = [
  {
    color: 'Sapphire',
    cost: 4,
    baseName: 'Vault Door',
    inkwell: true,
    quantity: 1,
    type: 'Item',
    id: 603,
  },
  {
    color: 'Steel',
    cost: 4,
    baseName: 'And Then Along Came Zeus',
    inkwell: false,
    quantity: 2,
    type: 'Action',
    id: 631,
  },
  {
    color: 'Amber',
    cost: 10,
    baseName: 'Chernabog',
    subtitle: 'Evildoer',
    inkwell: false,
    quantity: 1,
    type: 'Character',
    id: 435,
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
