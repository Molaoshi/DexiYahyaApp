/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rango.vip",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "api.rango.exchange",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
};

export default nextConfig;
