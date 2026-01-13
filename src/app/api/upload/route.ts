import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
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

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
