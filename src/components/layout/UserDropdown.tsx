'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutButton } from '../logout-button';
import { User } from 'lucide-react';

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="text-gray-400 hover:text-red-400 transition-colors">
          <User className="w-7 h-7" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#272727] border-0 text-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:bg-black">
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="w-full">
            <LogoutButton />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
