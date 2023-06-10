/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "upload.wikimedia.org",
      "flagcdn.com",
      "i.ibb.co",
    ],
  },
};

module.exports = nextConfig;
