'use client';
import { useState, useRef } from 'react';
import defaultProfileImage from '@/app/assets/defaults/default_avatar.jpg';
import Image, { StaticImageData } from 'next/image';
import { Camera } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';

const ProfileImage = ({ avatarUrl }: { avatarUrl?: string }) => {
  const { updateUserProfileImage } = useUserStore();
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    avatarUrl || defaultProfileImage
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const result = await updateUserProfileImage(formData);
        if (result.success && result.imageUrl) {
          setImageSrc(result.imageUrl);
        } else {
          console.error('Failed to update profile image:', result.error);
        }
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    }
  };

  return (
    <div className="relative">
      <Image
        src={imageSrc}
        alt="Profile image"
        width={128}
        height={128}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-red-500 object-cover"
      />
      <div
        className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1 cursor-pointer"
        onClick={handleCameraClick}
      >
        <Camera className="w-5 h-5 text-white" />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImage;
