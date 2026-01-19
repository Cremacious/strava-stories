'use client';
import { menuItems } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect } from 'react';

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId, fetchUserId } = useUserStore();

  useEffect(() => {
    fetchUserId();
  }, [fetchUserId]);

  return (
    <div className="hidden md:block border-red-900/40  border-r-2 p-4 h-screen w-full">
      <nav className="space-y-2 text-right">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-medium text-right ${
                isActive ? 'text-red-400 ' : 'text-gray-300 '
              }`}
            >
              {item.name}
            </a>
          );
        })}
        <a
          href={`/profile/${userId}`}
          className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-medium text-right ${
            pathname === '/profile' ? 'text-red-400 ' : 'text-gray-300 '
          }`}
        >
          Profile
        </a>
      </nav>
    </div>
  );
};

export default LeftSidebar;
