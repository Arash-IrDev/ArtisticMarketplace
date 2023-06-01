module.exports = {
  async headers() {
    return [
      {
        // Match paths ending in .css, .js, .jpg, .jpeg, .png, .gif, .webp, .svg, .woff, .woff2 in the public directory.
        source: '/public/:path*{.css,.js,.jpg,.jpeg,.png,.gif,.webp,.svg,.woff,.woff2}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',  // 1 year
          },
        ],
      },
    ];
  },
  env: {
    MY_ENV_VAR: process.env.MY_ENV_VAR,
  },
};
