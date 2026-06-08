import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me')
const COOKIE = 'santana_admin'

export async function signAdminToken() {
  return new SignJWT({ admin: true }).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('8h').sign(SECRET)
}

export async function verifyAdminToken(token: string) {
  try {
    await jwtVerify(token, SECRET)
    return true
  } catch {
    return false
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE)?.value
  if (!token) return false
  return verifyAdminToken(token)
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE, token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 28800 })
}

export async function clearAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE)
}
