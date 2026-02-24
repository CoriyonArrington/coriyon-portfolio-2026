import { ReactNode } from 'react';

// Next.js strictly requires a top-level root layout file when using a global not-found.tsx.
// Since your actual layout (with the html and body tags) is inside the [locale] directory, 
// this file simply acts as a pass-through to satisfy the Next.js compiler.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}