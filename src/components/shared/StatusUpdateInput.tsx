'use client';

import { Building, Camera, Users } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@/lib/validators/post.validators';
import { z } from 'zod';
import { usePostStore } from '@/stores/usePostStore';
import { Button } from '../ui/button';
import defaultProfileImage from '@/app/assets/defaults/default_avatar.jpg';
import { FriendWithDetails } from '@/lib/types/friends.type';
import defaultAvatar from '@/app/assets/defaults/default_avatar.jpg';

type FormData = z.infer<typeof createPostSchema>;

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
];

const StatusUpdateInput = ({
  location,
  id,
  userImage,
  onPostCreated,
  friends = [],
  isDemo = false,
}: {
  location: string;
  id?: string;
  userImage?: string;
  friends: FriendWithDetails[];
  onPostCreated?: () => void;
  isDemo?: boolean;
}) => {
  const { createPost, loading } = usePostStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<
    'compose' | 'tagFriends' | 'location'
  >('compose');
  const [selectedFriends, setSelectedFriends] = useState<FriendWithDetails[]>(
    []
  );
  const [friendSearch, setFriendSearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: '',
      privacy: 'FRIENDS',
      feeling: undefined,
      images: [],
      tags: [],
    },
  });

  const watchedImages = useWatch({ control, name: 'images' });

  const handleCreatePost = async (data: FormData) => {
    if (isDemo) {
      alert(
        'Demo Mode: Posting is disabled. This is a preview of the app functionality.'
      );
      reset();
      setIsDialogOpen(false);
      setDialogMode('compose');
      setSelectedFriends([]);
      setFriendSearch('');
      setSelectedCities([]);
      setCitySearch('');
      return;
    }

    const tags = [
      ...selectedFriends.map((friend) => ({
        type: 'USER' as const,
        value: friend.id,
      })),
      ...selectedCities.map((city) => ({
        type: 'LOCATION' as const,
        value: city,
      })),
    ];
    const postData = {
      ...data,
      feeling: data.feeling === '' ? undefined : data.feeling,
      tags,
      location,
      circleId: id,
    };

    try {
      await createPost(postData);
      reset();
      setIsDialogOpen(false);
      setDialogMode('compose');
      setSelectedFriends([]);
      setFriendSearch('');
      setSelectedCities([]);
      setCitySearch('');
      onPostCreated?.();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleFriendSelect = (friend: FriendWithDetails) => {
    setSelectedFriends((prev) =>
      prev.some((f) => f.id === friend.id)
        ? prev.filter((f) => f.id !== friend.id)
        : [...prev, friend]
    );
  };

  const handleCitySelect = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const filteredFriends = friends.filter(
    (friend) =>
      !friendSearch.trim() ||
      (friend.name &&
        friend.name.toLowerCase().includes(friendSearch.toLowerCase()))
  );

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto w-full cardBackground rounded-2xl">
      <div className="p-3">
        <div className="flex items-center ">
          <Image
            src={userImage || defaultProfileImage}
            alt="Your avatar"
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
          />
          <div
            className="flex-1 darkBackground border border-red-700 rounded-full px-4 py-2 cursor-pointer hover:bg-[#4d3030] transition-colors"
            onClick={() => setIsDialogOpen(true)}
          >
            <p className="text-gray-400">What&apos;s on your mind?</p>
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50">
          <div className="darkBackground border-0 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto m-2">
            <div className="p-4 border-b border-red-700">
              <h2 className="text-xl font-bold text-center text-white">
                Create Post
              </h2>
            </div>

            <form onSubmit={handleSubmit(handleCreatePost)} className="p-4">
              {dialogMode === 'compose' ? (
                <>
                  <div className="flex items-center mb-4">
                    <Image
                      src={userImage || '/placeholder-avatar.jpg'}
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full mr-3"
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="flex gap-2">
                        <select
                          {...register('privacy')}
                          className="darkBackground2 border border-red-700 rounded px-2 py-1 text-sm text-white"
                        >
                          <option value="FRIENDS">Private</option>
                          <option value="PUBLIC">Public</option>
                        </select>
                        <select
                          {...register('feeling')}
                          className="darkBackground2 border border-red-700 rounded px-2 py-1 text-sm text-white"
                        >
                          <option value="">Feeling</option>
                          <option value="HAPPY">Happy</option>
                          <option value="SAD">Sad</option>
                          <option value="EXCITED">Excited</option>
                          <option value="ANGRY">Angry</option>
                          <option value="TIRED">Tired</option>
                          <option value="MOTIVATED">Motivated</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <textarea
                    {...register('content')}
                    className="w-full bg-transparent border-none outline-none resize-none text-white text-lg placeholder-white/60"
                    placeholder="What's on your mind?"
                    rows={4}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm">
                      {errors.content.message}
                    </p>
                  )}

                  {watchedImages && watchedImages.length > 0 && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(watchedImages[0])}
                        alt="Selected"
                        className="w-full max-w-md rounded-lg"
                      />
                    </div>
                  )}

                  {selectedFriends.length > 0 && (
                    <div className="mt-2 text-sm text-gray-300">
                      with {selectedFriends.map((f) => f.email).join(', ')}
                    </div>
                  )}

                  {selectedCities.length > 0 && (
                    <div className="mt-2 text-sm text-gray-300">
                      in {selectedCities.join(', ')}
                    </div>
                  )}

                  <div className="mt-4 border border-red-700 rounded-lg p-4 darkBackground2">
                    <div className="flex justify-between items-center">
                      <p className="text-white font-semibold">
                        Add to your post
                      </p>
                      <div className="flex space-x-4">
                        <label className="flex items-center cursor-pointer text-gray-300 hover:text-red-400">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              setValue('images', file ? [file] : []);
                            }}
                          />
                          <span>
                            <Camera
                              className="text-red-500 hover:text-white "
                              size={25}
                            />
                          </span>
                        </label>
                        <button
                          type="button"
                          className="text-gray-300 hover:text-red-400"
                          onClick={() => setDialogMode('tagFriends')}
                        >
                          <Users
                            className="text-red-500 hover:text-white "
                            size={25}
                          />
                        </button>
                        <button
                          type="button"
                          className="text-gray-300 hover:text-red-400"
                          onClick={() => setDialogMode('location')}
                        >
                          <Building
                            className="text-red-500 hover:text-white "
                            size={25}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : dialogMode === 'tagFriends' ? (
                <>
                  <div className="flex items-center mb-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white mr-2"
                      onClick={() => setDialogMode('compose')}
                    >
                      ←
                    </button>
                    <h3 className="text-lg font-semibold text-white">
                      Tag Friends
                    </h3>
                  </div>

                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 mb-4"
                    placeholder="Search friends..."
                    value={friendSearch}
                    onChange={(e) => setFriendSearch(e.target.value)}
                  />

                  <div className="max-h-60 overflow-y-auto">
                    {filteredFriends.length === 0 && (
                      <p className="text-gray-400 text-center py-4">
                        {friends.length === 0
                          ? 'No friends to tag yet. Add some friends first!'
                          : 'No friends match your search.'}
                      </p>
                    )}
                    {filteredFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className={`flex items-center p-2 cursor-pointer cardBackground hover:bg-gray-700 rounded ${
                          selectedFriends.some((f) => f.id === friend.id)
                            ? 'bg-gray-600'
                            : ''
                        }`}
                        onClick={() => handleFriendSelect(friend)}
                      >
                        <Image
                          src={friend.avatarUrl || defaultAvatar}
                          alt={`${friend.name} avatar`}
                          className="w-8 h-8 rounded-full mr-3"
                          width={32}
                          height={32}
                        />
                        <span className="text-white">{friend.email}</span>
                        {selectedFriends.some((f) => f.id === friend.id) && (
                          <span className="ml-auto text-red-400">✓</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* {selectedFriends.length > 0 && (
                    <div className="mt-4 p-2 bg-gray-700 rounded">
                      <p className="text-sm text-gray-300 mb-1">Selected:</p>
                      <p className="text-white">
                        {selectedFriends.map((f) => f.name).join(', ')}
                      </p>
                    </div>
                  )} */}
                </>
              ) : dialogMode === 'location' ? (
                <>
                  <div className="flex items-center mb-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-white mr-2"
                      onClick={() => setDialogMode('compose')}
                    >
                      ←
                    </button>
                    <h3 className="text-lg font-semibold text-white">
                      Tag Location
                    </h3>
                  </div>

                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 mb-4"
                    placeholder="Search cities..."
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                  />

                  <div className="max-h-60 overflow-y-auto">
                    {filteredCities.map((city) => (
                      <div
                        key={city}
                        className={`flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded ${
                          selectedCities.includes(city) ? 'bg-gray-600' : ''
                        }`}
                        onClick={() => handleCitySelect(city)}
                      >
                        <Building size={16} className="mr-3 text-gray-400" />
                        <span className="text-white">{city}</span>
                        {selectedCities.includes(city) && (
                          <span className="ml-auto text-red-400">✓</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {selectedCities.length > 0 && (
                    <div className="mt-4 p-2 bg-gray-700 rounded">
                      <p className="text-sm text-gray-300 mb-1">Selected:</p>
                      <p className="text-white">{selectedCities.join(', ')}</p>
                    </div>
                  )}
                </>
              ) : null}

              <div className="p-4 border-t border-gray-700 flex justify-end">
                <Button
                  type="button"
                  variant={'outline'}
                  onClick={() => setIsDialogOpen(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusUpdateInput;
