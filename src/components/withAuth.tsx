
'use client';

import {useRouter} from 'next/navigation';
import {useEffect, ComponentType} from 'react';
import {useAuthStore} from '@/stores/auth.store';
import {Skeleton} from './ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useCurrentLocale } from '@/locales/client';

type UserRole = 'teacher' | 'guardian';

interface SessionData {
  user: {
    email: string;
    role: UserRole;
  } | null;
}

async function getSession(): Promise<SessionData> {
    const res = await fetch('/api/auth/session');
    // It's okay if it's not res.ok, it just means no session.
    // The query will go into `isError` state.
    return res.json();
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: UserRole[]
) => {
  const AuthComponent = (props: P) => {
    const router = useRouter();
    const locale = useCurrentLocale();
    const { login, logout, user } = useAuthStore();
    
    const { data: session, isLoading, isError, isSuccess } = useQuery<SessionData>({
        queryKey: ['session'],
        queryFn: getSession,
        retry: false, // Don't retry on 401s
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (isError || !session?.user) {
            logout();
            router.replace(`/${locale}/login`);
            return;
        }

        if (session.user) {
            if (allowedRoles.includes(session.user.role)) {
                login(session.user);
            } else {
                logout(); 
                router.replace(`/${locale}/login`);
            }
        }
    }, [isLoading, isError, session, allowedRoles, login, logout, router, locale]);

    if (isLoading || !user) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                 <Skeleton className="h-32 w-32 rounded-full" />
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                 </div>
            </div>
        </div>
      );
    }
    
    if (user && allowedRoles.includes(user.role)) {
         return <WrappedComponent {...props} />;
    }
    
    return null;
  };

  AuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return AuthComponent;
};

export default withAuth;
