import { Bell } from 'lucide-react';
import UserDropdown from './UserDropdown';
import logo from '@/app/assets/logo-only.png';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 darkBackground3 border-b-2 border-red-900/40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Strava Stories Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="text-white font-bold text-lg">Social Strides</span>
        </div>

        {/* <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full darkBackground hover:bg-[#4d3030] border border-red-700 rounded-full px-10 py-2 text-red-400 placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div> */}

        <div className="flex flex-row  justify-center items-center space-x-4">
          {/* <Search className="md:hidden text-gray-400 w-5 h-5" /> */}
          <button className="text-red-400 hover:text-red-400 transition-colors">
            <Bell className="w-7 h-7" />
          </button>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
