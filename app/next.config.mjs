/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables forbidden() so non-admins get a real HTTP 403 (US-04/AC-02).
  experimental: {
    authInterrupts: true,
    // US-05/AC-04: a 2 MB cover plus the other fields must fit in one Server Action request (default limit 1 MB).
    serverActions: { bodySizeLimit: '3mb' },
  },
};

export default nextConfig;
