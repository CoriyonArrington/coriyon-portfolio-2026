import type { NextConfig } from "next";

const pagesToRedirect = [
  'services', 
  'privacy', 
  'terms-of-service', 
  'refund-policy', 
  'security-policy', 
  'accessibility-statement'
];

const dynamicRedirects = pagesToRedirect.flatMap(page => [
  { source: `/${page}`, destination: `https://coriyon.studio/${page}`, permanent: true },
  { source: `/en/${page}`, destination: `https://coriyon.studio/${page}`, permanent: true },
  { source: `/es/${page}`, destination: `https://coriyon.studio/${page}`, permanent: true },
]);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'kkegducuyzwdmxlzhxcm.supabase.co' },
      { protocol: 'https', hostname: 'svstxlwvnujtgbgjsvwj.supabase.co' },
      { protocol: 'https', hostname: 'img.youtube.com' }
    ],
  },
  async redirects() {
    return dynamicRedirects;
  },
};

export default nextConfig;