/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@google-cloud/vision': 'commonjs @google-cloud/vision',
        'undici': 'commonjs undici',
      })
    } else {
      // On client side, completely exclude undici to avoid parsing issues
      config.resolve.alias = {
        ...config.resolve.alias,
        'undici': false,
      }
    }
    
    return config
  },
  serverExternalPackages: ['@google-cloud/vision'],
}

module.exports = nextConfig
