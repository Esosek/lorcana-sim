import setData from '../../data/sets.json';

export function GET() {
  try {
    const setsObject = setData.sets;
    for (const key in setsObject) {
      if (Object.hasOwnProperty.call(setsObject, key)) {
        setsObject[key] = {
          id: setsObject[key].id,
          code: setsObject[key].code,
          name: setsObject[key].name,
        };
      }
    }

    return new Response(JSON.stringify(setsObject), {
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
