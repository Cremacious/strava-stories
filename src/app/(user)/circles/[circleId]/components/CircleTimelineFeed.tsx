import StatusUpdateInput from '@/components/shared/StatusUpdateInput';
// import TimelineFeed from '@/components/shared/TimelineFeed';

const CircleTimelineFeed = () => {
  return (
    <div className="">
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Circle Feed</h2>
      </div>
      <StatusUpdateInput location="circle" />
      {/* <TimelineFeed posts={} /> */}
    </div>
  );
};
export default CircleTimelineFeed;
