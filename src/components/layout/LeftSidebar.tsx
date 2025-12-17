import { menuItems } from '@/lib/constants';

const LeftSidebar = () => {


  return (
    <div className="hidden md:block bg-gray-900 border-r border-gray-800 p-4 min-h-screen w-full">
      <nav className="space-y-2 text-right">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium text-right"
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default LeftSidebar;
