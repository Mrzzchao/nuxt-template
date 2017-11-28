const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const isDebug = process.env.DEBUG === 'debug'

module.exports = {
  // html 头配置
  head: {
    title: 'nuxt-template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href49
        : '/favicon.ico' }
    ]
  },

  // 进度条配置
  loading: { color: '#3B8070' },

  // 打包配置
  build: {
    // extend (config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // },
    filenames: {
      vendor: 'vendor.[hash].js',
      app: 'app.[chunkhash].js'
    },
    vendor: ['axios'],
    plugins: isProd ? [] : [
      new FriendlyErrorsPlugin(),
      new VConsolePlugin({
        enable: isDebug
      })
    ]
  },

  // 使用lru-cache缓存
  cache: {
    max: 1000, // 缓存组件的最大数目
    maxAge: 1000 * 60 * 15 // 缓存时间
  }

  // 配置全局 CSS 文件
  // css: [
  //
  // ],

  // 静态文件生成配置
  // generate: {
  //   dir: 'dist',
  //   routes: [   // 动态路由指定参数值
  //     '/users/1',
  //     '/users/2'
  //   ]
  // },

  // 性能配置
  // performance: {
  //   gzip: false,
  //   prefetch: false
  // },

}
