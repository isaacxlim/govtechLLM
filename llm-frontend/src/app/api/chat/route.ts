import { NextRequest } from 'next/server';
import axios from 'axios';

// Note: Update from NextApiRequest/NextApiResponse to just Request and Response objects
export async function POST(req: NextRequest) {
  const body = await req.json(); // Correctly parse the request body

  const { prompt, model } = body;

  if (!prompt) {
    return new Response(JSON.stringify({ message: 'Prompt is required' }), { status: 400 });
  }

  if (!model || model === "") {
    return new Response(JSON.stringify({ message: 'Model is required' }), { status: 400 });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const { choices } = response.data;
    const message = choices[0].message.content;

    return new Response(JSON.stringify({ message }), { status: 200 });
  } catch (error) {
    console.error('Error making API request');
    return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
  }
}
