import cloudinary from '@/lib/cloudinary';

export async function deleteCloudinaryImage(
  imageUrl: string | null | undefined
): Promise<void> {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return;
  }

  try {
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.findIndex((part) => part === 'upload');
    if (uploadIndex === -1) return;

    const publicIdWithVersion = urlParts.slice(uploadIndex + 1).join('/');
    const publicId = publicIdWithVersion
      .replace(/^v\d+\//, '')
      .replace(/\.[^/.]+$/, '');

    await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted Cloudinary image: ${publicId}`);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
}
