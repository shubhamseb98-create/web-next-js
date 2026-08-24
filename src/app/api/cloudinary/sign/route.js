import { v2 as cloudinary } from 'cloudinary';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return Response.json(
        { message: "Cloudinary credentials not configured" },
        { status: 400 }
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = 'webtycoons/banner';

    // Generate Cloudinary upload signature
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      apiSecret
    );

    return Response.json({
      signature,
      timestamp,
      cloudName,
      apiKey,
      folder
    });
  } catch (error) {
    console.error("Cloudinary Sign Error:", error);
    return Response.json(
      { message: "Failed to generate upload signature", error: error.message },
      { status: 500 }
    );
  }
}
