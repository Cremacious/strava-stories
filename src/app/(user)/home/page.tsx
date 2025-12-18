import StatusUpdateInput from './components/StatusUpdateInput';
import TimelineFeed from '../../../components/shared/TimelineFeed';

const UserHomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-full p-4">
      <StatusUpdateInput />

      <TimelineFeed />
    </div>
  );
};

export default UserHomePage;
