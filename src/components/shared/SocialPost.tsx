import { Post } from '@/lib/types/posts.type';

const SocialPost = ({ post }: { post: Post }) => {
  return (
    <div
      key={post.id}
      className="bg-gray-800 w-full border border-gray-700 rounded-lg overflow-hidden"
    >
      <div className="p-4 flex items-center relative">
        <img
          src={post.avatar}
          alt={`${post.userName} avatar`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-1">
          <p className="font-semibold text-white">{post.userName}</p>
          <p className="text-sm text-gray-400">{post.time}</p>
        </div>
        {post.feeling && (
          <div className="absolute top-4 right-4 text-sm text-red-400 font-medium">
            Feeling {post.feeling}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-white mb-2">{post.content}</p>
        <div className="flex flex-row gap-1">
          {post.tags.friends.length > 0 && (
            <p className="text-sm text-gray-300 mb-1">
              with {post.tags.friends.join(', ')}
            </p>
          )}
          {post.tags.cities.length > 0 && (
            <p className="text-sm text-gray-300 mb-1">
              in {post.tags.cities.join(', ')}
            </p>
          )}
        </div>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-4 pb-4">
          <img
            src={post.image}
            alt="Post image"
            className="w-full rounded-lg"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-700 flex justify-between">
        <button className="text-gray-400 hover:text-red-400 px-4 py-2 rounded">
          Like
        </button>
        <button className="text-gray-400 hover:text-red-400 px-4 py-2 rounded">
          Comment
        </button>
        <button className="text-gray-400 hover:text-red-400 px-4 py-2 rounded">
          Share
        </button>
      </div>
    </div>
  );
};
export default SocialPost;
