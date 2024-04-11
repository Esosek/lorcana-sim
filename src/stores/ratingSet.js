import { writable } from 'svelte/store';

const ratingSet = writable([]);

function increment(cardIndex) {
  ratingSet.update((prevSet) => {
    const updatedSet = [...prevSet];
    if (updatedSet[cardIndex].rating < 5.0) {
      updatedSet[cardIndex].rating += 0.5;
    }
    return updatedSet;
  });
}

function decrement(cardIndex) {
  ratingSet.update((prevSet) => {
    const updatedSet = [...prevSet];
    if (updatedSet[cardIndex].rating > 1.0) {
      updatedSet[cardIndex].rating -= 0.5;
    }
    return updatedSet;
  });
}

function sortByRating() {
  ratingSet.update((prevSet) => {
    const updatedSet = [...prevSet];
    updatedSet.sort((a, b) => b.rating - a.rating);
    return updatedSet;
  });
}

export default {
  subscribe: ratingSet.subscribe,
  set: ratingSet.set,
  increment,
  decrement,
  sortByRating,
};
