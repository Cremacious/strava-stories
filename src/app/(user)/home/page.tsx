import StatusUpdateInput from '../../../components/shared/StatusUpdateInput';
import TimelineFeed from '../../../components/shared/TimelineFeed';

const UserHomePage = () => {
  return (
    <div className=" min-h-full p-4">
      <div className="flex max-w-5xl mx-auto justify-center items-center rounded-lg p-4 bg-[#272727] border-b-2 border-red-900/40 mb-8">
        <StatusUpdateInput />
      </div>
      <TimelineFeed />
    </div>
  );
};

export default UserHomePage;
