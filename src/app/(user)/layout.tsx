import LeftSidebar from '@/components/layout/LeftSidebar';
import MobileNavbar from '@/components/layout/MobileNavbar';
import RightSidebar from '@/components/layout/RightSidebar';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 ">
        <div>
          <LeftSidebar />
        </div>
        <div className="lg:col-span-2">{children}</div>
        <div>
          <RightSidebar />
        </div>
      </div>
      <MobileNavbar />
    </div>
  );
}
