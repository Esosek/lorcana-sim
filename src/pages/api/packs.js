import { generatePacks } from '../../server/pack-generator';

export const prerender = false;

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const sets = url.searchParams.get('sets').split(',');
    const packs = generatePacks(sets);

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
