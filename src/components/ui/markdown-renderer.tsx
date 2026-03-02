'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const params = useParams();

  return (
    <Box
      css={{
        '& > *:first-of-type': { mt: 0 },
        '& > *:last-of-type': { mb: 0 },
        '& p': { mb: 4, lineHeight: '1.6' },
        '& ul': { pl: 6, mb: 4, listStyleType: 'disc' },
        '& ol': { pl: 6, mb: 4, listStyleType: 'decimal' },
        '& li': { mb: 2 },
        '& strong': { fontWeight: '600' }
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const isInternal = href?.startsWith('/') || href?.startsWith('#');
            let finalHref = href || '/';
            
            if (isInternal) {
              const currentLocale = params?.locale as string || 'en';
              
              // Correctly format absolute internal links to include the current locale
              if (href?.startsWith('/')) {
                // If it doesn't already have the locale prepended
                if (!href.startsWith(`/${currentLocale}/`) && href !== `/${currentLocale}`) {
                  if (href.startsWith('/#')) {
                    // Turn /#process into /en/#process
                    finalHref = `/${currentLocale}${href.substring(1)}`;
                  } else {
                    // Turn /about#services into /en/about#services
                    finalHref = `/${currentLocale}${href}`;
                  }
                }
              }

              // FIX: We MUST use the Next.js <Link> component for ALL internal navigation.
              // Using a native <a> tag causes a hard page reload, which destroys the chat history!
              return (
                <Link 
                  href={finalHref} 
                  style={{ color: 'var(--chakra-colors-green-600)', textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: '500' }}
                >
                  {children}
                </Link>
              );
            }
            
            return (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--chakra-colors-green-600)', textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: '500' }}
              >
                {children}
              </a>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}