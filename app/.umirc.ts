import { defineConfig } from 'umi';
const CopyPlugin = require("copy-webpack-plugin");

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: '/display', component: '@/pages/Display' },

      ],
    },
  ],
  fastRefresh: {},
  devServer: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
  },
  // chainWebpack: function(config) {
  //   config.output.globalObject('this');

  //   config.module
  //     .rule('worker')
  //     .test(/\.worker\.js$/)
  //     .use('worker-loader')
  //     .loader('worker-loader')
  //     .options({
  //       inline: true,
  //       fallback: false,
  //     });
  // },
  webpack5: {},
  workerLoader: {
    inline: 'fallback',
    esModule: true,
    publicPath: "/scripts/workers/",
  },
});
