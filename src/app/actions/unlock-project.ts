'use server'

import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export async function unlockProject(slug: string, passwordAttempt: string) {
  // Fetch the project's password from Supabase
  const { data, error } = await supabase
    .from('projects')
    .select('password')
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) {
    return { success: false, error: 'Project not found or error occurred.' }
  }

  // Verify and set a cookie that expires in 7 days
  if (data.password && data.password === passwordAttempt) {
    const cookieStore = await cookies()
    cookieStore.set(`unlocked_${slug}`, 'true', { 
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })
    return { success: true }
  }
  
  return { success: false, error: 'Incorrect password. Please try again.' }
}