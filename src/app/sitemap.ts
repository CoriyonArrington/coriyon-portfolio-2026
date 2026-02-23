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
  
  // Define all the new top-level pages we created
  const staticPages = ['', '/projects', '/about', '/blog']

  // 1. Generate URLs for core static pages in both languages
  const staticRoutes = locales.flatMap((locale) => 
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      // Give the home page top priority, and the other main pages slightly less
      priority: page === '' ? 1.0 : 0.9,
    }))
  )

  // 2. Generate URLs for every individual project case study in both languages
  const projectRoutes = (projects || []).flatMap((project) => 
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: project.created_at ? new Date(project.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  return [...staticRoutes, ...projectRoutes]
}