import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const token = request.cookies.get('auth_token')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl; // Obtener la ruta actual

  if (pathname === '/login' && token) {
    // Crea la URL absoluta para la redirección
    const miCuentaUrl = new URL('/mi-cuenta', request.url);
    return NextResponse.redirect(miCuentaUrl);
  }

  const protectedPaths = ['/mi-cuenta', '/orders'];

  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  const isAdminPath = request.nextUrl.pathname.includes('/admin');

  // Verificar autenticación para rutas protegidas
  if (isProtectedPath && !token) {
    const redirectUrl = new URL('/login', request.url);
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
      console.log('Usuario sin permisos de administrador, redirigiendo');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// --- Configuración del Middleware ---
export const config = {
  matcher: [
    '/login',
    '/mi-cuenta/:path*',
    '/orders/:path*',
    '/admin/:path*',
  ]
};