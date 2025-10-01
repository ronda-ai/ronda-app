
import {createI18nMiddleware} from 'next-international/middleware';
import {NextRequest, NextResponse} from 'next/server';
import { verifyAuth } from './lib/auth';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'es', 'pt', 'fr', 'de', 'zh-CN', 'ja', 'ru', 'it', 'pl', 'nl', 'ko', 'hi', 'id'],
  defaultLocale: 'es',
  urlMappingStrategy: 'rewrite',
});

const isPublicPage = (pathname: string) => {
    return pathname.includes('/public/');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (isPublicPage(pathname)) {
    return I18nMiddleware(request);
  }

  let isAuthenticated = false;
  try {
    await verifyAuth(request);
    isAuthenticated = true;
  } catch (err) {
    isAuthenticated = false;
  }
  
  const i18nResponse = I18nMiddleware(request);
  const locale = i18nResponse.headers.get('x-next-locale') || 'es';

  const isLoginPage = pathname.endsWith('/login');

  // If the user is authenticated and tries to access /login, redirect to home
  if (isAuthenticated && isLoginPage) {
    return Response.redirect(new URL(`/${locale}`, request.url));
  }

  // If the user is not authenticated and tries to access a protected page
  if (!isAuthenticated && !isLoginPage) {
      return Response.redirect(new URL(`/${locale}/login`, request.url));
  }
  
  return i18nResponse;
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico).*)'],
};
