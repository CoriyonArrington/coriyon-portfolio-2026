'use client';

import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Heading, Text, Code, Box, Link } from '@chakra-ui/react';

const MarkdownChakraComponents: Components = {
  h1: ({ children }) => <Heading as="h1" size="xl" my={4} fontWeight="bold">{children}</Heading>,
  h2: ({ children }) => <Heading as="h2" size="lg" my={3} fontWeight="bold">{children}</Heading>,
  h3: ({ children }) => <Heading as="h3" size="md" my={2} fontWeight="bold">{children}</Heading>,
  p: ({ children }) => <Text my={2} lineHeight="relaxed">{children}</Text>,
  // Safe rendering for lists in Chakra v3
  ul: ({ children }) => <Box as="ul" pl={6} my={2} css={{ listStyleType: 'disc' }}>{children}</Box>,
  ol: ({ children }) => <Box as="ol" pl={6} my={2} css={{ listStyleType: 'decimal' }}>{children}</Box>,
  li: ({ children }) => <Box as="li" my={1} lineHeight="relaxed">{children}</Box>,
  a: ({ href, children }) => <Link href={href} color="green.500" target="_blank" textDecoration="underline">{children}</Link>,
  strong: ({ children }) => <Box as="strong" fontWeight="bold" color="fg.default">{children}</Box>,
  code: ({ className, children }) => {
    const isInline = !className;
    return isInline ? (
      <Code p={1} fontSize="0.85em" rounded="md" bg="bg.muted">{children}</Code>
    ) : (
      <Box as="pre" p={4} my={4} borderRadius="md" bg="bg.muted" overflowX="auto" fontSize="sm">
        <Code bg="transparent" p={0}>{children}</Code>
      </Box>
    );
  },
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Box className="markdown-body" css={{ '& > *:first-of-type': { mt: 0 }, '& > *:last-child': { mb: 0 } }}>
      <ReactMarkdown components={MarkdownChakraComponents} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
}