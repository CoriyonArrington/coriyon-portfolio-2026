import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export const revalidate = 0 // Ensures the sitemap is always fresh

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.coriyon.com'

  // Fetch all project slugs from Supabase
  const { data: projects } = await supabase
    .from('projects')
    .select('slug, created_at')

  const locales = ['en', 'es']

  // 1. Generate URLs for the Home page in both languages
  const homeRoutes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }))

  // 2. Generate URLs for every project in both languages
  const projectRoutes = (projects || []).flatMap((project) => 
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: project.created_at ? new Date(project.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  return [...homeRoutes, ...projectRoutes]
}