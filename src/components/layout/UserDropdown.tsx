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
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUserStore } from '@/stores/useUserStore';
import defaultAvatar from '@/app/assets/defaults/default_avatar.jpg';
import {
  User,
  Settings,
  Bell,
  Users,
  MessageCircle,
  Check,
  X,
} from 'lucide-react';

const notifications = [
  {
    id: '1',
    type: 'circle_approved',
    message: 'Your request to join "Morning Runners" has been approved!',
    circleName: 'Morning Runners',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    message: 'Sarah commented on your post: "Great workout!"',
    userName: 'Sarah',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'circle_approved',
    message: 'Your request to join "Trail Blazers" has been approved!',
    circleName: 'Trail Blazers',
    time: '1 day ago',
    read: true,
  },
];

const UserDropdown = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const notificationCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="relative">
          <Image
            src={user?.avatarUrl || defaultAvatar.src}
            alt="User Avatar"
            width={32}
            height={32}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent hover:ring-red-500 transition-all"
          />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-[#1e1e1e] border border-gray-700 text-white p-0 mr-2">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Image
              src={user?.avatarUrl || defaultAvatar.src}
              alt="User Avatar"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">
                {user?.username || 'User'}
              </p>
              <p className="text-sm text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="p-2 border-b border-gray-700">
          <DropdownMenuItem
            onClick={() => router.push(`/profile/${user?.id}`)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <User className="w-4 h-4 text-gray-400" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push('/settings')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Account Settings</span>
          </DropdownMenuItem>
        </div>

        <div className="border-b border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-400" />
              <span className="font-semibold text-sm">Notifications</span>
              {notificationCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {notificationCount}
                </span>
              )}
            </div>
            <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
              Mark all read
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-900 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-red-800/60' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        notification.type === 'circle_approved'
                          ? 'bg-green-500/20'
                          : 'bg-blue-500/20'
                      }`}
                    >
                      {notification.type === 'circle_approved' ? (
                        <Users className="w-4 h-4 text-green-400" />
                      ) : (
                        <MessageCircle className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm leading-snug ${
                          !notification.read ? 'text-white' : 'text-gray-300'
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <Bell className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No notifications yet</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-700">
              <button
                onClick={() => router.push('/notifications')}
                className="w-full text-center text-sm text-red-400 hover:text-red-300 py-1 transition-colors"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        <div className="p-2">
          <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-gray-800 focus:bg-gray-800 text-red-400 hover:text-red-300">
            <LogoutButton />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdown;
