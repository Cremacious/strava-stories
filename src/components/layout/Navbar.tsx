import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Site Name - Left */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-red-400">Strava Stories</h1>
        </div>

        {/* Search Input - Center */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 border border-gray-700 rounded-full px-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Icons - Right */}
        <div className="flex items-center space-x-4">
          <Search className="md:hidden text-gray-400 w-5 h-5" />
          <button className="text-gray-400 hover:text-red-400 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-red-400 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
