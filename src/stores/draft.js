import { writable } from 'svelte/store';

const defaultDraft = {
  currentPackIndex: 0,
  currentPickIndex: 0,
  currentPack: [],
};

const draft = writable(defaultDraft);

export default {
  subscribe: draft.subscribe,
  addPacks,
  nextPick,
  isDrafting: false,
};

let packs = [];
let roundPacks = [];

function addPacks(generatedPacks) {
  // split packs into groups
  for (let i = 0; i < Object.values(generatedPacks).length; i += 8) {
    packs.push(Object.values(generatedPacks).slice(i, i + 8));
  }
  roundPacks.push(packs[0]);
  packs.shift();

  draft.update((prevDraft) => {
    return {
      ...prevDraft,
      currentPack: roundPacks[0][0].cards,
      isDrafting: true,
    };
  });
}

function nextPick() {
  if (roundPacks[0].cards.length === 0) {
    endPack();
  }
  console.log('Ending pick!');
  currentPick++;
}

function endPack() {
  if (packs.length === 0) {
    endDraft();
  }
  console.log('Ending pack!');

  currentPack++;
}

function endDraft() {
  console.log('Draft ended!');
  draft.update((prevDraft) => {
    return { ...prevDraft, isDrafting: false };
  });
}
