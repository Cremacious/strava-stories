import { menuItems } from '@/lib/constants';

const MobileNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 lg:hidden">
      <div className="flex justify-around items-center py-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex flex-col items-center px-3 py-2 text-gray-400 hover:text-red-400 active:text-red-500 transition-colors duration-200"
          >
            <span className="text-xs font-medium">{item.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavbar;
