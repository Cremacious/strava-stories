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
