import { Post } from '@/lib/types/posts.type';
import defaultAvatar from '@/app/assets/defaults/default_avatar.jpg';
import Image from 'next/image';

const SocialPost = ({ post }: { post: Post }) => {
  return (
    <div
      key={post.id}
      className="cardBackground rounded-lg overflow-hidden max-w-xl mx-auto"
    >
      <div className="p-4 flex items-center relative">
        <Image
          src={post.avatar || defaultAvatar}
          alt={`${post.userName} avatar`}
          className="w-10 h-10 rounded-full mr-3"
          width={40}
          height={40}
        />
        <div className="flex-1">
          <p className="font-semibold text-white">{post.userName}</p>
          <p className="text-sm text-gray-400">{post.time}</p>
        </div>
        {post.feeling && (
          <div className="absolute top-4 right-4 text-sm text-red-500 font-medium">
            Feeling {post.feeling}
          </div>
        )}
      </div>

      <div className="px-4 pb-2">
        {post.content && <p className="text-white mb-2">{post.content}</p>}
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

      {post.image && (
        <div className="px-4 pb-4">
          <Image
            src={post.image}
            alt="Post image"
            width={500}
            height={300}
            className="w-full h-auto max-h-96 rounded-lg object-contain"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-2 border-t-2 flex justify-between">
        <button className="text-white hover:text-red-500 px-4 py-2 rounded">
          Like
        </button>
        <button className="text-white hover:text-red-500 px-4 py-2 rounded">
          Comment
        </button>
        <button className="text-white hover:text-red-500 px-4 py-2 rounded">
          Share
        </button>
      </div>
    </div>
  );
};
export default SocialPost;
