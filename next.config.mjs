/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@react-pdf/renderer"],
  images: {
    domains: ["hatchsanitary.com", "apis.hatchsanitary.com"],
  },
};

export default nextConfig;
