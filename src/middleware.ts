import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const ROLES_ALLOWED_TO_AUTH = ['USER', 'ADMIN'];

export default withAuth(
  function middleware(req) {
    console.log('Middleware running for:', req.nextUrl.pathname);
    console.log('User role:', req.nextauth.token?.role);
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.role !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    } else if (
      (req.nextUrl.pathname.startsWith('/user') && !req.nextauth.token) ||
      (req.nextUrl.pathname.startsWith('/pay') && !req.nextauth.token) ||
      (req.nextUrl.pathname.startsWith('/payment-success') &&
        !req.nextauth.token)
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) =>
        token?.role !== undefined && ROLES_ALLOWED_TO_AUTH.includes(token.role),
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/user/:path*',
    '/pay/:path*',
    '/payment-success/:path*',
  ],
};
