import cardData from '../../data/cards.json';
import { RarityTable } from '../../stores/options';

export const prerender = false;

export function GET({ request }) {
  try {
    const url = new URL(request.url);
    const setNumber = url.searchParams.get('set');

    const setCards = [];
    const cardsObject = cardData.cards;
    for (const card of cardsObject) {
      if (card.setNumber == setNumber) {
        // filter out special rarities
        if (RarityTable[card.rarity] !== undefined) {
          setCards.push(card);
        }
      }
    }

    return new Response(JSON.stringify(setCards), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
