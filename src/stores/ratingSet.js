import { writable } from 'svelte/store';

const ratingSet = writable([]);

function moveCard(prevIndex, newIndex) {
  ratingSet.update((prevSet) => {
    const [card] = prevSet.splice(prevIndex, 1);
    prevSet.splice(newIndex, 0, card);
    return prevSet;
  });
}

export default {
  subscribe: ratingSet.subscribe,
  set: ratingSet.set,
  move: moveCard,
};
