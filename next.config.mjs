/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['styles'],
    silenceDeprecations: ['legacy-js-api']
  }
};

export default nextConfig;
