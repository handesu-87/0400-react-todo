/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  /* config options here */
  output: "export",
  assetPrefix: isProd
    ? "https://handesu-87.github.io/0400-react-todo/"
    : undefined,
};

export default nextConfig;
