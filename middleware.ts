import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase() || req.nextUrl.origin.includes('api') || req.nextUrl.pathname.includes('.') || req.nextUrl.pathname.includes('_') || req.nextUrl.pathname.includes('OD')) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL(req.nextUrl.origin + req.nextUrl.pathname.toLowerCase()),
  );
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
