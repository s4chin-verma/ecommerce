/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'petuwmjatwjtvxvcngsm.supabase.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'gems-workdo.myshopify.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
