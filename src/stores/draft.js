import { writable } from 'svelte/store';
import options from './options';
import cardRatings from '../data/cardRatings.json';

const defaultDraft = {
  currentPackIndex: 0,
  currentPickIndex: 0,
  currentPack: [],
  isDrafting: false,
};

const draft = writable(defaultDraft);

export default {
  subscribe: draft.subscribe,
  addPacks,
  pickCard,
};

let packs = [];
let roundPacks = [];

function addPacks(generatedPacks) {
  // split packs into groups
  for (let i = 0; i < Object.values(generatedPacks).length; i += 8) {
    packs.push(Object.values(generatedPacks).slice(i, i + 8));
  }

  openNextPack();
}

function openNextPack() {
  roundPacks = [...packs[0]];
  packs.shift();

  draft.update((prevDraft) => {
    return {
      currentPackIndex: prevDraft.currentPackIndex + 1,
      currentPickIndex: 1,
      currentPack: [...roundPacks[0].cards],
      isDrafting: true,
    };
  });
}

function pickCard(cardIndex) {
  const currentPack = roundPacks[0].cards;
  currentPack.splice(cardIndex, 1);

  if (currentPack.length === 0) {
    endPack();
    return;
  }

  botPicks();
  passPacks();
}

function endPack() {
  if (packs.length === 0) {
    endDraft();
    return;
  }

  openNextPack();
  console.log('Ending pack!');
}

function endDraft() {
  console.log('Draft ended!');
  draft.update((prevDraft) => {
    return { ...prevDraft, isDrafting: false };
  });
  options.update((prevOptions) => {
    return { ...prevOptions, isBuilding: true };
  });
}

function botPicks() {
  for (let i = 1; i < roundPacks.length; i++) {
    removeBestCard(roundPacks[i]);
  }
}

function removeBestCard(pack) {
  const setCardRatings = cardRatings[pack.setId];
  const packRatings = pack.cards.map((card) => setCardRatings[card.id]);
  const maxRating = Math.max(...packRatings);

  const bestCardIndexes = pack.cards
    .map((card, index) => {
      if (setCardRatings[card.id] === maxRating) {
        return index;
      }
    })
    .filter((card) => card !== undefined);

  const bestCardIndex =
    bestCardIndexes[Math.floor(Math.random() * bestCardIndexes.length)];

  pack.cards.splice(bestCardIndex, 1);
  return pack;
}

function passPacks() {
  const lastPlayerPack = roundPacks.shift();
  roundPacks.push(lastPlayerPack);
  draft.update((prevDraft) => {
    return {
      ...prevDraft,
      currentPack: [...roundPacks[0].cards],
      currentPickIndex: prevDraft.currentPickIndex + 1,
    };
  });
}
