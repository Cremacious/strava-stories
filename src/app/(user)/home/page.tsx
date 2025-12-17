import StatusUpdateInput from './components/StatusUpdateInput';
import TimelineFeed from '../../../components/shared/TimelineFeed';

const UserHomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-full p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <StatusUpdateInput />
      </div>
      <div className="max-w-4xl mx-auto">
        <TimelineFeed />
      </div>
    </div>
  );
};

export default UserHomePage;
