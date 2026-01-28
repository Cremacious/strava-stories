import LeftSidebar from '@/components/layout/LeftSidebar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import RightSidebar from '@/components/layout/RightSidebar';
import QueryProvider from './QueryProvider';
import Navbar from '@/components/layout/Navbar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createUser } from '@/actions/user.actions';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect('/auth/login');
  }

  // Check if user exists in database, create if not
  try {
    let userProfile = await prisma.user.findUnique({
      where: { id: data.claims.sub },
      select: { onboardingCompleted: true },
    });

    if (!userProfile) {
      // Create user record if it doesn't exist
      const createResult = await createUser(
        data.claims.email!,
        data.claims.sub
      );
      if (createResult.success) {
        userProfile = { onboardingCompleted: false };
      } else {
        console.error('Failed to create user record:', createResult.error);
        // Continue with onboarding check assuming user needs onboarding
        userProfile = { onboardingCompleted: false };
      }
    }

    if (userProfile && !userProfile.onboardingCompleted) {
      redirect('/auth/onboarding');
    }
  } catch (error) {
    console.error('Error checking/creating user:', error);
    // If there's an error, assume user needs onboarding
    redirect('/auth/onboarding');
  }

  return (
    <QueryProvider>
      <Navbar />
      <div className="h-screen flex">
        <div className="hidden lg:block w-64 shrink-0">
          <LeftSidebar />
        </div>
        <div
          className="flex-1 lg:flex-none lg:w-[calc(100%-32rem)] overflow-y-auto pb-20 lg:pb-0 custom-scrollbar darkBackground2 "
          style={{ flexGrow: 1 }}
        >
          {children}
        </div>

        <div className="hidden lg:block w-64 shrink-0">
          <RightSidebar />
        </div>

        <MobileNavbar />
      </div>
    </QueryProvider>
  );
}
