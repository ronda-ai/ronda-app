
import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  // To delete a cookie, you must create a response and call the delete method on it.
  const response = NextResponse.json({message: 'Logged out successfully'});
  response.cookies.delete('user-token');
  return response;
}
