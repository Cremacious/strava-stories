import LeftSidebar from '@/components/layout/LeftSidebar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import RightSidebar from '@/components/layout/RightSidebar';
import QueryProvider from './QueryProvider';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
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
