import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');

  if (!tag) {
    return NextResponse.json(
      { success: false, message: 'Tag parameter is required' },
      { status: 400 }
    );
  }

  try {
    revalidateTag(tag);
    return NextResponse.json({
      success: true,
      message: `Cache with tag '${tag}' revalidated`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { success: false, message: 'Error revalidating cache' },
      { status: 500 }
    );
  }
}