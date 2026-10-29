/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables forbidden() so non-admins get a real HTTP 403 (US-04/AC-02).
  experimental: { authInterrupts: true },
};

export default nextConfig;
