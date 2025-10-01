
import {NextResponse} from 'next/server';
import { SignJWT } from 'jose';

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error('JWT_SECRET_KEY is not set in .env file');
  }
  return new TextEncoder().encode(secret);
};


export async function POST(request: Request) {
  try {
    const {email, password} = await request.json();

    const teacherUser = process.env.TEACHER_USER;
    const teacherPass = process.env.TEACHER_PASS;
    const guardianUser = process.env.GUARDIAN_USER;
    const guardianPass = process.env.GUARDIAN_PASS;

    if (!teacherUser || !teacherPass) {
      console.error('Teacher auth variables are not set in .env file');
      return NextResponse.json(
        {message: 'Authentication is not configured.'},
        {status: 500}
      );
    }
    
    let userPayload = null;

    if (email === teacherUser && password === teacherPass) {
        userPayload = { role: 'teacher', email: teacherUser };
    } else if (guardianUser && guardianPass && email === guardianUser && password === guardianPass) {
        userPayload = { role: 'guardian', email: guardianUser };
    }
    
    if (userPayload) {
        const token = await new SignJWT(userPayload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h') // Token expires in 24 hours
            .sign(getJwtSecretKey());

        const response = NextResponse.json({ user: userPayload }, { status: 200 });

        response.cookies.set('user-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    }

    return NextResponse.json(
      {message: 'Invalid credentials'},
      {status: 401}
    );
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
