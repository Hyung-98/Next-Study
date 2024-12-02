/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['styles'],
    silenceDeprecations: ['legacy-js-api']
  },
  images: {
    domains: ['prod-files-secure.s3.us-west-2.amazonaws.com']
  }
};

export default nextConfig;
