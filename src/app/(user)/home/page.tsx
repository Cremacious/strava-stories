import StatusUpdateInput from './components/StatusUpdateInput';
import TimelineFeed from './components/TimelineFeed';

const UserHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <StatusUpdateInput />

      <TimelineFeed />
    </div>
  );
};

export default UserHomePage;
