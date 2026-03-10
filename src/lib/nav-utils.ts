import { supabase } from '@/lib/supabase'
import { unstable_cache } from 'next/cache'

export const getCachedNavLinks = unstable_cache(
  async () => {
    const { data } = await supabase
      .from('pages')
      .select('slug, nav_title')
      .eq('page_type', 'MAIN_MENU')
      .eq('status', 'PUBLISHED')
      .order('sort_order', { ascending: true })

    if (!data) return [];

    return data.map(page => ({
      id: page.slug,
      slug: page.slug === 'home' ? '/' : page.slug,
      nav_title: page.nav_title || page.slug
    }));
  },
  ['main-menu-nav-links'],
  { revalidate: 3600, tags: ['pages'] }
)