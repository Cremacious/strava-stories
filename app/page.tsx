'use client';
import { requestAccess, syncActivities } from '@/lib/strava/strava-utils';

export default function Home() {
  const handleAuth = () => {
    requestAccess();
  };

  const handleActivity = async () => {
    syncActivities();
  };

  return (
    <>
      Hello world
      <button onClick={handleAuth} className="bg-blue-400 m-4">
        Auth
      </button>
      <button onClick={handleActivity} className="bg-blue-400 m-4">
        Activities
      </button>
    </>
  );
}
