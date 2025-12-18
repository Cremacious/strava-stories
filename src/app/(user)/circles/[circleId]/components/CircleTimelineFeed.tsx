import StatusUpdateInput from "@/app/(user)/home/components/StatusUpdateInput";
import TimelineFeed from "@/components/shared/TimelineFeed";

const CircleTimelineFeed = () => {
  return (
    <div className="border-red-900 border-2 p-2 md:p-4 rounded-2xl">
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Circle Feed</h2>
      </div>
      <StatusUpdateInput />
      <TimelineFeed />
    </div>
  );
};
export default CircleTimelineFeed;
