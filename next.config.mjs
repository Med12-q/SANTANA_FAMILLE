/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'files.catbox.moe' },
      { protocol: 'https', hostname: '**.githubusercontent.com' },
    ],
    unoptimized: true,
  },
}
export default nextConfig
