/** @type {import('next').NextConfig} */

const pagesToRedirect = [
  'services', 
  'privacy', 
  'terms-of-service', 
  'refund-policy', 
  'security-policy', 
  'accessibility-statement'
];

// Dynamically generate redirects for root, /en/, and /es/ paths
const dynamicRedirects = pagesToRedirect.flatMap(page => [
  { source: `/${page}`, destination: `https://coriyon.studio/${page}`, permanent: true },
  { source: `/en/${page}`, destination: `https://coriyon.studio/${page}`, permanent: true },
  { source: `/es/${page}`, destination: `https://coriyon.studio/${page}`, permanent: true },
]);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kkegducuyzwdmxlzhxcm.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "react-icons"],
  },
  async redirects() {
    return dynamicRedirects;
  },
};

export default nextConfig;