import { generatePacks } from '../../server/pack-generator';

export const prerender = false;

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const sets = url.searchParams.get('sets').split(',');
    const packs = generatePacks(sets);

    // logPacks(packs);

    return new Response(JSON.stringify(packs), {
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

function logPacks(packs) {
  let commonCount = 0;
  let uncommonCount = 0;
  let rareCount = 0;
  let superCount = 0;
  let legendaryCount = 0;
  let enchantedCount = 0;

  for (const packKey in packs) {
    const packCards = packs[packKey].cards;
    for (const card of packCards) {
      switch (card.rarity) {
        case 'Common':
          commonCount++;
          break;
        case 'Uncommon':
          uncommonCount++;
          break;
        case 'Rare':
          rareCount++;
          break;
        case 'Super':
          superCount++;
          break;
        case 'Legendary':
          legendaryCount++;
          break;
        case 'Enchanted':
          enchantedCount++;
          break;

        default:
          break;
      }
    }
  }

  console.log('Common', commonCount);
  console.log('Uncommon', uncommonCount);
  console.log('Rare', rareCount);
  console.log('Super', superCount);
  console.log('Legendary', legendaryCount);
  console.log('Enchanted', enchantedCount);
}
