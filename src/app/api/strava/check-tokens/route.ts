import { getUserSession } from '@/actions/user.actions';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const user = await getUserSession();
  if (!user.success) return NextResponse.json({ hasTokens: false });

  const dbUser = await prisma.user.findUnique({
    where: { id: user.user?.id },
    select: { stravaAccessToken: true },
  });
  return NextResponse.json({ hasTokens: !!dbUser?.stravaAccessToken });
}