import { cardData } from '../../data/cards.json';

export async function GET({ request }) {
  try {
    return new Response(JSON.stringify('Returning sets'), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
