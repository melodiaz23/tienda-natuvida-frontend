import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const token = request.cookies.get('auth_token')?.value;
  const userRole = request.cookies.get('user_role')?.value;

  const protectedPaths = ['/mi-cuenta', '/orders'];
  const adminPaths = ['/admin'];

  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  const isAdminPath = adminPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Verificar autenticación para rutas protegidas
  if (isProtectedPath && !token) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Verificar rol de administrador para rutas de administración
  if (isAdminPath) {
    if (!token) {
      const redirectUrl = new URL('/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Verificar si tiene rol de administrador
    if (userRole !== 'ADMIN') {
      console.log(userRole);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mi-cuenta/:path*', '/orders/:path*', '/admin/:path*']
};