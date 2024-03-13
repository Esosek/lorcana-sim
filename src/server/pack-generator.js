import cardData from '../data/cards.json';

const Rarity = {
  Common: 'Common',
  Uncommon: 'Uncommon',
  Rare: 'Rare',
  Super: 'Super',
  Legendary: 'Legendary',
  Enchanted: 'Enchanted',
  Foil: 'Foil',
};

const commons = [];
const uncommons = [];
const rares = [];
const superRares = [];
const legendaries = [];
const enchanted = [];

cardData.cards.forEach((card) => {
  switch (card.rarity) {
    case Rarity.Common:
      commons.push(card);
      break;
    case Rarity.Uncommon:
      uncommons.push(card);
      break;
    case Rarity.Rare:
      rares.push(card);
      break;
    case Rarity.Super:
      superRares.push(card);
      break;
    case Rarity.Legendary:
      legendaries.push(card);
      break;
    case Rarity.Enchanted:
      enchanted.push(card);
      break;
    case 'Special':
      // Filter out promos
      break;

    default:
      console.error(card.fullName, 'rarity not found!');
      break;
  }
});

export function generatePacks(sets) {
  const packs = {};

  for (let i = 0; i < sets.length; i++) {
    packs[i + 1] = {
      setId: sets[i],
      cards: generatePack(sets[i]),
    };
  }
  return packs;
}

function generatePack(setNumber) {
  const commons = generateCards(setNumber, Rarity.Common, 6);
  const uncommons = generateCards(setNumber, Rarity.Uncommon, 3);
  const rares = generateCards(setNumber, Rarity.Rare, 2);
  const foil = generateCards(setNumber, Rarity.Foil, 1);

  return [...commons, ...uncommons, ...rares, ...foil];
}

function generateCards(setNumber, rarity, count) {
  const cards = [];
  let pool = [];

  switch (rarity) {
    case Rarity.Common:
      pool = [...commons.filter((card) => card.setNumber == setNumber)];
      break;
    case Rarity.Uncommon:
      pool = [...uncommons.filter((card) => card.setNumber == setNumber)];
      break;
    case Rarity.Rare:
      // Get rarity
      pool = [...rares.filter((card) => card.setNumber == setNumber)];
      break;
    case Rarity.Foil:
      // Get rarity
      pool = [...enchanted.filter((card) => card.setNumber == setNumber)];
      break;

    default:
      break;
  }

  for (let i = 0; i < count; i++) {
    const newCardIndex = Math.floor(Math.random() * pool.length);
    cards.push(pool[newCardIndex]);
    pool.splice(newCardIndex, 1);
  }

  return cards;
}
