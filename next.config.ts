import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Required for static export — no server-side image optimization
    unoptimized: true,
  },
  trailingSlash: true,
  // Local dev: allow requests from LAN IP
  allowedDevOrigins: ["192.168.1.189"],
};

export default nextConfig;