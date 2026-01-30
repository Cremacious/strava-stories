'use client'
import UserDropdown from './UserDropdown';
import logo from '@/app/assets/logo-only.png';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 darkBackground3 border-b-2 border-red-900/40 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
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

        <div className="flex flex-row justify-center items-center space-x-4">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
