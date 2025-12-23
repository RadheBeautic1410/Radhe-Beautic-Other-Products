'use server'

import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { UserRole } from '@prisma/client'

const SESSION_COOKIE_NAME = 'auth_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface SessionUser {
  id: string
  phoneNumber: string
  name: string | null
  role: UserRole
}

/**
 * Hash password (simple implementation - in production use bcrypt)
 */
async function hashPassword(password: string): Promise<string> {
  // For now, using a simple approach. In production, use bcryptjs:
  // const bcrypt = require('bcryptjs')
  // return await bcrypt.hash(password, 10)
  
  // Simple hash for development - replace with bcrypt in production
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Verify password
 */
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // For now, using a simple approach. In production, use bcryptjs:
  // const bcrypt = require('bcryptjs')
  // return await bcrypt.compare(password, hashedPassword)
  
  // Simple verification for development - replace with bcrypt in production
  const hashed = await hashPassword(password)
  return hashed === hashedPassword
}

/**
 * Create session cookie
 */
function createSessionCookie(userId: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: userId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: SESSION_MAX_AGE,
    path: '/',
  }
}

/**
 * Get current session user
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!sessionId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        phoneNumber: true,
        name: true,
        role: true,
      },
    })

    if (!user) {
      return null
    }

    return {
      id: user.id,
      phoneNumber: user.phoneNumber,
      name: user.name,
      role: user.role,
    }
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

/**
 * Register a new user
 */
export async function register(
  phoneNumber: string,
  password: string,
  name?: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate phone number (basic validation)
    if (!phoneNumber || phoneNumber.trim().length < 10) {
      return { success: false, message: 'Please enter a valid phone number' }
    }

    // Validate password
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber.trim() },
    })

    if (existingUser) {
      return { success: false, message: 'Phone number already registered. Please login instead.' }
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user with CUSTOMER role
    const user = await prisma.user.create({
      data: {
        phoneNumber: phoneNumber.trim(),
        password: hashedPassword,
        name: name?.trim() || null,
        role: 'CUSTOMER',
      },
      select: {
        id: true,
        phoneNumber: true,
        name: true,
        role: true,
      },
    })

    // Create session
    const cookieStore = await cookies()
    cookieStore.set(createSessionCookie(user.id))

    return { success: true, message: 'Registration successful' }
  } catch (error) {
    console.error('Error registering user:', error)
    return { success: false, message: 'Failed to register. Please try again.' }
  }
}

/**
 * Login user
 */
export async function login(
  phoneNumber: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate inputs
    if (!phoneNumber || !password) {
      return { success: false, message: 'Please enter phone number and password' }
    }

    // Find user by phone number
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber.trim() },
      select: {
        id: true,
        phoneNumber: true,
        name: true,
        role: true,
        password: true,
      },
    })

    if (!user || !user.password) {
      return { success: false, message: 'Invalid phone number or password' }
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      return { success: false, message: 'Invalid phone number or password' }
    }

    // Create session
    const cookieStore = await cookies()
    cookieStore.set(createSessionCookie(user.id))

    return { success: true, message: 'Login successful' }
  } catch (error) {
    console.error('Error logging in:', error)
    return { success: false, message: 'Failed to login. Please try again.' }
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<SessionUser> {
  const user = await getSession()
  
  if (!user) {
    redirect('/login')
  }
  
  return user
}

/**
 * Get user ID from session (for use in server actions)
 */
export async function getUserId(): Promise<string | null> {
  const user = await getSession()
  return user?.id || null
}

