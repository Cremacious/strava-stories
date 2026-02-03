import LeftSidebar from '@/components/layout/LeftSidebar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import RightSidebar from '@/components/layout/RightSidebar';
import QueryProvider from '../(user)/QueryProvider';
import Navbar from '@/components/layout/Navbar';
import DemoStoreInitializer from './DemoStoreInitializer';

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <DemoStoreInitializer />
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
