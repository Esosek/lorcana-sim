import { cardData } from '../../data/cards.json';

export const prerender = false;

export async function GET({ request }) {
  try {
    console.log(request);
    const url = new URL(request.url);
    const sets = url.searchParams.get('sets');

    return new Response(JSON.stringify('Returning cards'), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
