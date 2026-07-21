import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const { name } = await params;
  
  // Directly access the Gemini generated artifacts folder
  const artifactDir = 'C:\\Users\\ACER\\.gemini\\antigravity-cli\\brain\\0f5f143d-ada3-476b-a1d0-ceef6c976209';
  
  try {
    const files = fs.readdirSync(artifactDir);
    // Find the newest generated image that matches the prefix
    const matchingFiles = files.filter(f => f.startsWith(name) && f.endsWith('.jpg'));
    
    if (matchingFiles.length === 0) {
      return new NextResponse('Image not found', { status: 404 });
    }
    
    // Sort to get the latest if multiple exists
    matchingFiles.sort();
    const matchingFile = matchingFiles[matchingFiles.length - 1];
    
    const filePath = path.join(artifactDir, matchingFile);
    const imageBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
