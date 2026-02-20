import { i18nRouter } from 'next-i18n-router';
import { NextRequest } from 'next/server';
// Adjust this path if your i18nConfig is located somewhere else
import { i18nConfig } from './i18n';

// FIX: Changed the function name from 'middleware' to 'proxy'
export function proxy(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// Ensure the proxy only runs on pages, not files/images
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};