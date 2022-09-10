const CopyPlugin = require('copy-webpack-plugin');
const withAntdLess = require('next-plugin-antd-less');
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withAntdLess({
  cssLoaderOptions: {
    mode: 'local',
    exportLocalsConvention: 'camelCase',
    exportOnlyLocals: false,
    getLocalIdent: (context, localIdentName, localName, options) => {
      return 'whatever_random_class_name';
    },
  },
  // lessLoaderOptions: {
  //   /* ... */
  //   lessOptions: {
  //     /* ... */
  //     // modifyVars: {
  //     //   "primary-color": "#9900FF",
  //     //   "border-radius-base": "2px",
  //     // },
  //   },
  // },

  // for Next.js ONLY
  // nextjs: {
  //   localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
  // },

  async headers() {
    return [
      {
        source: '/edit',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
      {
        source: '/about',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // if (dev) {
    //   config.optimization.splitChunks = false;
    // }
    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';

    // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    // config.plugins.push(
    //   new CopyPlugin({
    //     patterns: [
    //       {
    //         from: './static',
    //         to: './public/webviewer',
    //       },
    //     ],
    //   })
    // );
    return config;
  },
});

module.exports = nextConfig;
