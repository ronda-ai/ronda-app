
// This endpoint is no longer needed as the logic is consolidated into the text-to-speech route.
// It can be safely deleted or left empty. For safety, we'll leave it empty.
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    return NextResponse.json({ message: 'This endpoint is deprecated. Use /api/games/text-to-speech instead.' }, { status: 410 });
}
