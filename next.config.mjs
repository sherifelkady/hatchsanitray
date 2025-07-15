/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@react-pdf/renderer"],
  images: {
    domains: ["hatchsanitary.com"], // غيّر 'example.com' للدومين اللي بتستخدمه
  },
};

export default nextConfig;
