import StatusUpdateInput from '@/components/shared/StatusUpdateInput';
import TimelineFeed from '@/components/shared/TimelineFeed';

const CircleTimelineFeed = () => {
  return (
    <div className="">
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Circle Feed</h2>
      </div>
      <StatusUpdateInput />
      <TimelineFeed />
    </div>
  );
};
export default CircleTimelineFeed;
