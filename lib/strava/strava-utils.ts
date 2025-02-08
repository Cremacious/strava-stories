const SCOPE = process.env.NEXT_PUBLIC_SCOPE || 'read,activity:read_all';
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/api/strava-callback';


export const requestAccess = () => {
  console.log('Requesting access...');
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID || '',
    redirect_uri: REDIRECT_URI,
    response_type: process.env.RESPONSE_TYPE || 'code',
    approval_prompt: process.env.APPROVAL_PROMPT || 'force',
    scope: SCOPE,
  });
  console.log('Redirecting to Strava authorization page...');

  const url = `https://www.strava.com/oauth/authorize?${params.toString()}`;
  window.location.href = url;
};

export const syncActivities = async (token: string) => {
    try {
      const response = await fetch(
        'https://www.strava.com/api/v3/athlete/activities',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log('Fetched activities data:', data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
  };