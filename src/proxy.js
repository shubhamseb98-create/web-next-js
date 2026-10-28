import { NextResponse } from 'next/server';

// ─── Auth Proxy — replaces deprecated middleware.js ──────────────────────────
// Docs: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
//
// The function MUST be named `proxy` (not `middleware`) in Next.js 16.
// The config.matcher keeps the same shape as before.

export function proxy(request) {
  let token = request.cookies.get('admin_token')?.value;

  // Support Bearer token in Authorization header as well
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    }
  }

  const { pathname } = request.nextUrl;

  // Protect Dashboard Routes: Redirect unauthenticated users to login
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Guest Routes: Redirect authenticated users away from login/signup
  if (pathname === '/login' || pathname === '/signup') {
    if (token) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match dashboard and login/signup routes only (API routes handle their own auth via requireAuth)
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
