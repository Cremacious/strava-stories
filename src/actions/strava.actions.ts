
function validateEnvVars() {
  if (!process.env.CLIENTID) {
    throw new Error(
      'Missing CLIENTID environment variable. Please add it to .env.local',
    );
  }
  if (!process.env.CLIENT_SECRET) {
    throw new Error(
      'Missing CLIENT_SECRET environment variable. Please add it to .env.local',
    );
  }
  if (!process.env.BETTER_AUTH_URL) {
    throw new Error(
      'Missing BETTER_AUTH_URL environment variable. Please add it to .env.local',
    );
  }
}

validateEnvVars();

const STRAVA_CLIENT_ID = process.env.CLIENTID!;
const STRAVA_CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REDIRECT_URI = process.env.BETTER_AUTH_URL! + '/api/strava/callback';

export function getStravaAuthUrl() {
  const params = new URLSearchParams({
    client_id: STRAVA_CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'read,activity:read_all',
    approval_prompt: 'force',
  });
  return `https://www.strava.com/oauth/authorize?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    }),
  });
  return res.json();
}

export async function getStravaActivities(accessToken: string) {
  const res = await fetch('https://www.strava.com/api/v3/athlete/activities', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Strava API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function refreshStravaToken(refreshToken: string) {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  return res.json();
}
