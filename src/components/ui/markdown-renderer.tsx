'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
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
        '& strong': { fontWeight: '600' },
        // Move styling to CSS object to seamlessly apply the dynamic color palette to all anchor tags
        '& a': { 
          color: 'colorPalette.600', 
          textDecoration: 'underline', 
          textUnderlineOffset: '2px', 
          fontWeight: '500' 
        }
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
            const isInternal = href?.startsWith('/') || href?.startsWith('#');
            let finalHref = href || '/';
            
            if (isInternal) {
              const currentLocale = params?.locale as string || 'en';
              
              if (href?.startsWith('/')) {
                if (!href.startsWith(`/${currentLocale}/`) && href !== `/${currentLocale}`) {
                  if (href.startsWith('/#')) {
                    finalHref = `/${currentLocale}${href.substring(1)}`;
                  } else {
                    finalHref = `/${currentLocale}${href}`;
                  }
                }
              }

              return (
                <Link href={finalHref}>
                  {children}
                </Link>
              );
            }
            
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
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