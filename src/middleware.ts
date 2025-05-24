import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authInfo = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const token = authInfo?.accessToken;

  // başlangıç sayfası / olmadığı için direkt  collections veyalogin sayfasına yönlendir @sg
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/collections", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/collections", request.url));
  }
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

/**
 * Bu matcher, middleware'ın hangi yollar için çalışacağını belirler.
 * htaccess gibi çalışması için bu matcher'ı kullanıyoruz
 *
 * @see: https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
