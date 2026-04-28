import { NextResponse } from 'next/server';
import { DATABASE_ID, ALLOWED_GENRES, FavoriteGenre } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, full_name, favorite_genre, neighborhood } = body;

    // 1. Validation
    if (!email || !full_name || !favorite_genre || !neighborhood) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Genre validation
    if (!ALLOWED_GENRES.includes(favorite_genre as FavoriteGenre)) {
      return NextResponse.json(
        { error: `Invalid genre. Must be one of: ${ALLOWED_GENRES.join(', ')}` },
        { status: 400 }
      );
    }

    // 2. Database Ingestion
    // Using the public database endpoint for POST submissions
    const dbResponse = await fetch(`https://api.baget.ai/api/public/databases/${DATABASE_ID}/rows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          email,
          full_name,
          favorite_genre,
          neighborhood,
        },
      }),
    });

    if (!dbResponse.ok) {
      const errorData = await dbResponse.json();
      console.error('Database error:', errorData);
      return NextResponse.json(
        { error: 'Failed to save to waitlist' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully joined the waitlist' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
