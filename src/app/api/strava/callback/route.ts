import { exchangeCodeForToken } from '@/actions/strava.actions';
import { NextResponse } from 'next/server';
import { getUserSession } from '@/actions/user.actions';
import { prisma } from '@/lib/prisma';
import { syncStravaWorkouts } from '../sync/route';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect(
      new URL('/sign-in?error=missing_code', url.origin),
    );
  }

  try {
    const tokenData = await exchangeCodeForToken(code);
    if (!tokenData || !tokenData.access_token) {
      return NextResponse.redirect(
        new URL('/sign-in?error=token_failed', url.origin),
      );
    }

    const user = await getUserSession();
    if (user && user.user?.id) {
      const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);
      await prisma.user.update({
        where: { id: user.user.id },
        data: {
          stravaAccessToken: tokenData.access_token,
          stravaRefreshToken: tokenData.refresh_token,
          stravaTokenExpiresAt: expiresAt,
        },
      });

      await syncStravaWorkouts(user.user.id);
    }

    return NextResponse.redirect(new URL('/workouts', url.origin));
  } catch (error) {
    console.error('Strava token exchange failed:', error);
    return NextResponse.redirect(
      new URL('/sign-in?error=server_error', url.origin),
    );
  }
}
