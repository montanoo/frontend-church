import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './utils/session'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/', '/books', '/finances']
const publicRoutes = ['/auth']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  console.log(path)
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('token')?.value
  const session = await decrypt(cookie)
  console.log(session)
  console.log(cookie)
  console.log(isProtectedRoute)
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl))
  }
  if (path === '/auth' && session?.id) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  // 5. Redirect to "/" if the user is authenticated
  if (
    isPublicRoute &&
    session?.id &&
    !req.nextUrl.pathname.startsWith('/')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}