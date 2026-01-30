'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { deleteCloudinaryImage } from '@/lib/cloudinary-utils';
import cloudinary from '@/lib/cloudinary';
import { User } from '@/lib/types/user.type';

export async function createUser(email: string, userId: string, name?: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (existingUser) {
      return { success: true, user: existingUser };
    }

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email,
        name: name || null,
        onboardingCompleted: false,
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
  }
}

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
        },
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

export async function getUserProfile(): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
        city: true,
        state: true,
        country: true,
        onboardingCompleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!profile) {
      return { success: false, error: 'User not found' };
    }

    const userProfile: User = {
      id: profile.id,
      username: profile.name || '',
      email: profile.email,
      avatarUrl: profile.avatarUrl || undefined,
      bio: profile.bio || undefined,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
      city: profile.city || undefined,
      state: profile.state || undefined,
      country: profile.country || undefined,
      onboardingCompleted: profile.onboardingCompleted,
    };

    return { success: true, user: userProfile };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch user profile',
    };
  }
}

export async function getUserProfileById(userId: string): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
        city: true,
        state: true,
        country: true,
        onboardingCompleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!profile) {
      return { success: false, error: 'User not found' };
    }

    const userProfile: User = {
      id: profile.id,
      username: profile.name || '',
      email: profile.email,
      avatarUrl: profile.avatarUrl || undefined,
      bio: profile.bio || undefined,
      city: profile.city || undefined,
      state: profile.state || undefined,
      country: profile.country || undefined,
      onboardingCompleted: profile.onboardingCompleted,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };

    return { success: true, user: userProfile };
  } catch (error) {
    console.error('Error fetching user profile by ID:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch user profile',
    };
  }
}

export async function updateUserLocation(
  userId: string,
  city: string,
  state: string,
  country: string,
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || user.id !== userId) {
      return {
        success: false,
        error: 'User not authenticated or unauthorized',
      };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { city, state, country },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating user location:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to update user location',
    };
  }
}

export async function completeOnboarding(userId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || user.id !== userId) {
      return {
        success: false,
        error: 'User not authenticated or unauthorized',
      };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true },
    });

    return { success: true };
  } catch (error) {
    console.error('Error completing onboarding:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to complete onboarding',
    };
  }
}

export async function updateUsername(userId: string, newUsername: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || user.id !== userId) {
      return {
        success: false,
        error: 'User not authenticated or unauthorized',
      };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name: newUsername },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating username:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to update username',
    };
  }
}

export async function getCurrentUserAvatar() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'User not authenticated' };
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      
    });
    if (!existingUser) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, avatarUrl: existingUser.avatarUrl || null };
  } catch (error) {
    console.error('Error fetching current user avatar:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch current user avatar',
    };
  }
}
