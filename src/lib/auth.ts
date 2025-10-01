
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-key-that-is-long-enough');

export async function verifyAuth(request: NextRequest) {
    const token = request.cookies.get('user-token')?.value;

    if (!token) {
        throw new Error('Missing user token');
    }

    try {
        const verified = await jwtVerify(
            token,
            secretKey
        );
        return verified.payload;
    } catch (err) {
        throw new Error('Your token has expired or is invalid.');
    }
}
