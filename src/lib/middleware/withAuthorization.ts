
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

type UserRole = 'teacher' | 'guardian';

export interface AuthenticatedUserPayload {
    role: UserRole;
    email: string;
    iat: number;
    exp: number;
}

export type GenericRouteContext = {
    params: { [key: string]: string | string[] };
};

type ApiHandler = (
    req: NextRequest,
    authUser: AuthenticatedUserPayload,
    context: GenericRouteContext
) => Promise<Response | NextResponse> | Response | NextResponse;

type Policy = (user: AuthenticatedUserPayload) => boolean;

export function withAuthorization(handler: ApiHandler, ...policies: Policy[]) {
    return async (req: NextRequest, context: GenericRouteContext) => {
        try {
            const payload = await verifyAuth(req);
            const user = payload as unknown as AuthenticatedUserPayload;

            const authorized = policies.every(policy => policy(user));

            if (!authorized) {
                return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
            }

            return handler(req, user, context);
        } catch (err: any) {
            return NextResponse.json({ message: err.message || 'Unauthorized' }, { status: 401 });
        }
    };
}
