/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", //giao thức
        hostname: "images.pexels.com", //domain
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
