import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    let token = request.nextauth?.token?.token
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // if at login page and user is logged in, redirect to the dashboard
    if (request.nextUrl.pathname.startsWith('/login') && token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
)

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    '/((?!api|_next/static|_next/image|images|favicon.ico|login|confirm-email).*)',
  ],
}
