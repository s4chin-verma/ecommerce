import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

const ROLES_ALLOWED_TO_AUTH = ['USER', 'ADMIN'];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_JWT_SECRET as string,
  });

  const url = request.nextUrl;

  if (!token)
    return NextResponse.redirect(new URL('/shop/auth/login', request.url));

  if (url.pathname.startsWith('/admin')) {
    if (token.role === 'ADMIN') return NextResponse.next();
    else return NextResponse.redirect(new URL('/shop/auth/login', request.url));
  }

  if (!ROLES_ALLOWED_TO_AUTH.includes(token.role as string))
    return NextResponse.redirect(new URL('/shop/auth/login', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/shop/user/:path'],
};
