import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    console.log('Exchanging authorization code for access token...');
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange authorization code for access token');
    }

    const data = await response.json();
    console.log('Exchanged authorization code for access token:', data);
    const { access_token } = data;
    console.log('Access token:', access_token);

    res.redirect(`/success?token=${access_token}`);
  } catch (error) {
    console.error(
      'Error exchanging authorization code for access token:',
      error
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
}