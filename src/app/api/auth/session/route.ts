
import {NextResponse, NextRequest} from 'next/server';
import { verifyAuth } from '@/lib/auth';

// This is a session endpoint.
// It verifies a session token (e.g., from a cookie)
// and returns the user associated with it.
export async function GET(request: NextRequest) {
  try {
    const payload = await verifyAuth(request);
    return NextResponse.json({ user: payload });
  } catch(e) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
