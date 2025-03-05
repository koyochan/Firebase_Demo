import type { APIRoute } from 'astro';

// POST リクエストに対応
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nfc_uid } = body;

    console.log('Received NFC UID:', nfc_uid);

    return new Response(
      JSON.stringify({
        success: true,
        message: `NFC UID received: ${nfc_uid}`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error in NFC API:', err);
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid request' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};