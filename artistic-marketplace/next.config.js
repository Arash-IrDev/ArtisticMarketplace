module.exports = {
  async headers() {
    return [
      {
        source: '/_next/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year cache with immutable flag
          },
        ],
      },
    ];
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
  env: {
    MY_ENV_VAR: process.env.MY_ENV_VAR,
  },
};