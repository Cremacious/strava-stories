// import { friendsSample } from '@/lib/sample/friends.sample';
import FriendDisplay from './components/FriendDisplay';
import SearchFriends from './components/SearchFriends';
import PendingFriendRequests from './components/PendingFriendRequests';
import { getPendingFriendRequests } from '@/actions/friend.actions';
import { getAllUserFriends } from '@/actions/friend.actions';

const FriendsPage = async () => {
  const result = await getPendingFriendRequests();
  const pendingFriendRequests = result.friendRequests;
  const friendResult = await getAllUserFriends();
  const friends = friendResult.success ? friendResult.friends : [];
  

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Friends</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Connect with fellow fitness enthusiasts and track progress together
          </p>
        </div>
        <div className="text-sm text-gray-400"></div>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchFriends />
          <PendingFriendRequests friendRequests={pendingFriendRequests} />
        </div>
        <FriendDisplay friends={friends} />
      </div>
    </div>
  );
};

export default FriendsPage;
