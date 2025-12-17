'use client';

import { Building } from 'lucide-react';
import { useState } from 'react';

const friends = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'Diana Prince',
  'Eve Wilson',
  'Frank Miller',
];

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

const StatusUpdateInput = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<
    'compose' | 'tagFriends' | 'location'
  >('compose');
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [friendTags, setFriendTags] = useState('');
  const [cityTags, setCityTags] = useState('');
  const [feeling, setFeeling] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [friendSearch, setFriendSearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState('');

  const handleCreatePost = () => {
    setIsDialogOpen(false);
    setDialogMode('compose');
    setPostContent('');
    setSelectedImage(null);
    setFriendTags('');
    setCityTags('');
    setFeeling('');
    setSelectedFriends([]);
    setFriendSearch('');
    setSelectedCities([]);
    setCitySearch('');
  };

  const handleFriendSelect = (friend: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friend)
        ? prev.filter((f) => f !== friend)
        : [...prev, friend]
    );
  };

  const handleCitySelect = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const filteredFriends = friends.filter((friend) =>
    friend.toLowerCase().includes(friendSearch.toLowerCase())
  );

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
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
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-center text-white">
                Create Post
              </h2>
            </div>

            <div className="p-4">
              {dialogMode === 'compose' ? (
                <>
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

                  {selectedFriends.length > 0 && (
                    <div className="mt-2 text-sm text-gray-300">
                      with {selectedFriends.join(', ')}
                    </div>
                  )}

                  {selectedCities.length > 0 && (
                    <div className="mt-2 text-sm text-gray-300">
                      in {selectedCities.join(', ')}
                    </div>
                  )}

                  <div className="mt-4 border border-gray-600 rounded-lg p-4 bg-gray-700">
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
                            onChange={(e) =>
                              setSelectedImage(e.target.files?.[0] || null)
                            }
                          />
                          <span>📷</span>
                        </label>
                        <button
                          className="text-gray-300 hover:text-red-400"
                          onClick={() => setDialogMode('tagFriends')}
                        >
                          👥
                        </button>
                        <button
                          className="text-gray-300 hover:text-red-400"
                          onClick={() => setDialogMode('location')}
                        >
                          <Building size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : dialogMode === 'tagFriends' ? (
                <>
                  <div className="flex items-center mb-4">
                    <button
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
                    {filteredFriends.map((friend) => (
                      <div
                        key={friend}
                        className={`flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded ${
                          selectedFriends.includes(friend) ? 'bg-gray-600' : ''
                        }`}
                        onClick={() => handleFriendSelect(friend)}
                      >
                        <img
                          src="/placeholder-avatar.jpg"
                          alt={`${friend} avatar`}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <span className="text-white">{friend}</span>
                        {selectedFriends.includes(friend) && (
                          <span className="ml-auto text-red-400">✓</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {selectedFriends.length > 0 && (
                    <div className="mt-4 p-2 bg-gray-700 rounded">
                      <p className="text-sm text-gray-300 mb-1">Selected:</p>
                      <p className="text-white">{selectedFriends.join(', ')}</p>
                    </div>
                  )}
                </>
              ) : dialogMode === 'location' ? (
                <>
                  <div className="flex items-center mb-4">
                    <button
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
    </div>
  );
};
export default StatusUpdateInput;
