'use client';

import { useState } from 'react';

interface Post {
  id: string;
  userName: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  tags: { friends: string[]; cities: string[] };
  feeling: string;
}

const UserHomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [friendTags, setFriendTags] = useState('');
  const [cityTags, setCityTags] = useState('');
  const [feeling, setFeeling] = useState('');

  // Placeholder posts data
  const posts: Post[] = [
    {
      id: '1',
      userName: 'John Doe',
      avatar: '/placeholder-avatar.jpg',
      time: '2 hours ago',
      content: 'Had a great run today in the park!',
      image: '/placeholder-image.jpg',
      tags: { friends: ['Jane Smith'], cities: ['New York'] },
      feeling: 'Excited',
    },
    {
      id: '2',
      userName: 'You',
      avatar: '/placeholder-avatar.jpg',
      time: '1 day ago',
      content: 'Feeling motivated for the weekend workouts.',
      tags: { friends: [], cities: ['Los Angeles'] },
      feeling: 'Happy',
    },
    // Add more placeholder posts as needed
  ];

  const handleCreatePost = () => {
    // Placeholder: In a real app, this would submit to backend
    console.log('Creating post:', {
      postContent,
      selectedImage,
      friendTags,
      cityTags,
      feeling,
    });
    setIsDialogOpen(false);
    setPostContent('');
    setSelectedImage(null);
    setFriendTags('');
    setCityTags('');
    setFeeling('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Status Input */}
      <div className="mb-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <img
              src="/placeholder-avatar.jpg"
              alt="Your avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div
              className="flex-1 bg-gray-700 border border-gray-600 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-600 transition-colors"
              onClick={() => setIsDialogOpen(true)}
            >
              <p className="text-gray-400">What&apos;s on your mind?</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-around">
              <button className="flex items-center text-gray-400 hover:text-red-400">
                <span>Photo</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-red-400">
                <span>Tag Friends</span>
              </button>
              <button className="flex items-center text-gray-400 hover:text-red-400">
                <span>Feeling</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-center text-white">
                Create Post
              </h2>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-4">
                <img
                  src="/placeholder-avatar.jpg"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-white">You</p>
                  <select
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                  >
                    <option value="">Feeling</option>
                    <option value="Happy">Happy</option>
                    <option value="Sad">Sad</option>
                    <option value="Excited">Excited</option>
                    <option value="Angry">Angry</option>
                    <option value="Tired">Tired</option>
                    <option value="Motivated">Motivated</option>
                  </select>
                </div>
              </div>

              <textarea
                className="w-full bg-transparent border-none outline-none resize-none text-white text-lg placeholder-gray-400"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={4}
              />

              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-full max-w-md rounded-lg"
                  />
                </div>
              )}

              <div className="mt-4 border border-gray-600 rounded-lg p-4 bg-gray-700">
                <p className="text-white font-semibold mb-2">
                  Add to your post
                </p>
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer text-gray-300 hover:text-red-400">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setSelectedImage(e.target.files?.[0] || null)
                      }
                    />
                    <span>Photo</span>
                  </label>
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1"
                    placeholder="Tag friends"
                    value={friendTags}
                    onChange={(e) => setFriendTags(e.target.value)}
                  />
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none text-white placeholder-gray-400 flex-1"
                    placeholder="Tag cities"
                    value={cityTags}
                    onChange={(e) => setCityTags(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded font-semibold"
                onClick={handleCreatePost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
          >
            {/* Post Header */}
            <div className="p-4 flex items-center">
              <img
                src={post.avatar}
                alt={`${post.userName} avatar`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <p className="font-semibold text-white">{post.userName}</p>
                <p className="text-sm text-gray-400">{post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-2">
              <p className="text-white mb-2">{post.content}</p>

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
              {post.feeling && (
                <p className="text-sm text-red-400 mb-2">
                  Feeling {post.feeling}
                </p>
              )}
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
        ))}
      </div>
    </div>
  );
};

export default UserHomePage;
