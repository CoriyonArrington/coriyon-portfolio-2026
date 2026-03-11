import { supabase } from '@/lib/supabase'
import { cache } from 'react'

export const getNavLinks = cache(async () => {
  const { data } = await supabase
    .from('pages')
    .select('slug, nav_title, page_type')
    // FIX: This must be .in() to fetch both menu types. If it's .eq(), the More menu will never appear.
    .in('page_type', ['MAIN_MENU', 'EXPLORE']) 
    .eq('status', 'PUBLISHED')
    .order('sort_order', { ascending: true })

  if (!data) return [];

  return data.map(page => ({
    id: page.slug,
    slug: page.slug === 'home' ? '/' : page.slug,
    nav_title: page.nav_title || page.slug,
    page_type: (page.page_type || '').trim().toUpperCase()
  }));
})