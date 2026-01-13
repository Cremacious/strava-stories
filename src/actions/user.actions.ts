'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { deleteCloudinaryImage } from '@/lib/cloudinary-utils';
import cloudinary from '@/lib/cloudinary';

export async function getUserSession() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }
    return { success: true, user };
  } catch (error) {
    console.error('Error in getUserSession:', error);
    return { success: false, error: 'User not authenticated' };
  }
}

export async function updateUserProfileImage(formData: FormData) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'fit-profile',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    const imageUrl = result.secure_url;

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!existingUser) {
      return { success: false, error: 'User not found' };
    }

    if (existingUser.avatarUrl) {
      await deleteCloudinaryImage(existingUser.avatarUrl);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { avatarUrl: imageUrl },
    });

    return { success: true, imageUrl };
  } catch (error) {
    console.error('Error updating profile image:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to update profile image',
    };
  }
}
