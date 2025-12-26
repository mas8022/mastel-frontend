import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.iran.liara.space" },
    ],
  },
};

export default nextConfig;
