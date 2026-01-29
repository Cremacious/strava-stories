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

  try {
    let userProfile = await prisma.user.findUnique({
      where: { id: data.claims.sub },
      select: { onboardingCompleted: true },
    });

    if (!userProfile) {
      const createResult = await createUser(
        data.claims.email!,
        data.claims.sub,
      );
      if (createResult.success) {
        userProfile = { onboardingCompleted: false };
      } else {
        console.error('Failed to create user record:', createResult.error);
        userProfile = { onboardingCompleted: false };
      }
    }

    if (userProfile && !userProfile.onboardingCompleted) {
      redirect('/auth/onboarding');
    }
  } catch (error) {
    console.error('Error checking/creating user:', error);
    redirect('/auth/onboarding');
  }

  return (
    <QueryProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden lg:block flex-2 min-w-64">
            <LeftSidebar />
          </div>
          <div className="flex-4 overflow-y-auto pb-20 lg:pb-0 custom-scrollbar darkBackground2">
            {children}
          </div>
          <div className="hidden lg:block flex-2 min-w-64">
            <RightSidebar />
          </div>
          <MobileNavbar />
        </div>
      </div>
    </QueryProvider>
  );
}
