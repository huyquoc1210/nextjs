/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", //giao thức
        hostname: "localhost", //domain
        port: "4000",
        // pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
