import { getStravaAuthUrl } from '@/actions/strava.actions';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(getStravaAuthUrl());
}
