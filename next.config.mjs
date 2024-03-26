/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
        bodyParser: {
            sizeLimit: '1024mb' // Set desired value here
        }
    },
  images: {
    remotePatterns: [
      {protocol:'https', hostname:'**'}
    ]
  }
};

export default nextConfig;
