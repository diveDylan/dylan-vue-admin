'use strict'
const path = require('path')
const title = 'dylan-vue-admin'
const resolve = dir => path.resolve(__dirname, dir)
const port = '3008'
const compressWebpackPlugin = require('compression-webpack-plugin')
// workbox
const { GenerateSW } = require('workbox-webpack-plugin')
// https://cli.vuejs.org/guide/css.html#referencing-assets
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('./src/styles/function.scss'),
      ]
    })
}
// isPrd
const isPrd = process.env.NODE_ENV === 'production'
// please read document [https://cli.vuejs.org/guide/webpack.html#simple-configuration]
module.exports = {
  // dev server & proxy
  devServer: {
    open: true,
    port,
    // test gzip dev serve
    // compress: true,
    proxy: {
      '/api': {
        target: 'http://172.28.6.64:3333',
        changeOrigin: true,
        // target --- Server.js about wsProxy: Cannot read property 'upgrade' of undefined ---> wx:false
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: config => {
    if (isPrd) return {
       // Gzip 
      // TODO: need test with ngnix
      // productionGzip: isPrd,
      // productionGzipExtensions: [ 'js', 'css' ],
      plugins: [

        new GenerateSW({ 
          swDest: './sw.js',
          // importWorkboxFrom: 'local',  
          skipWaiting: true,  
          clientsClaim: true,
          runtimeCaching: [{
            // Match any same-origin request that contains 'api'.
            urlPattern: /api/,
            // Apply a network-first strategy.
            handler: 'NetworkFirst',
            options: {
              // Fall back to the cache after 10 seconds.
              networkTimeoutSeconds: 10,
              // Use a custom cache name for this route.
              cacheName: 'my-api-cache',
              // Configure custom cache expiration.
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60,
              },
              // Configure which responses are considered cacheable.
              cacheableResponse: {
                statuses: [0, 200],
                headers: {'x-test': 'true'},
              },
              // Configure the broadcast cache update plugin.
              broadcastUpdate: {
                channelName: 'my-update-channel',
              },
              // Add in any additional plugin logic you need.
              // plugins: [
              //   {cacheDidUpdate: () => /* custom plugin code */}
              // ],
            },
          }]
        }),
      ]
    }
  },
  // babel will includes node_modules folder name element-ui
  transpileDependencies: ['element-ui'],
  // // external: a way of excluding dependencies from the output bundles [https://webpack.js.org/configuration/externals/#root]
  // // mostly if u want use cdn, here is examples for enternals use with cdn [https://github.com/diveDylan/blog/issues/3]
  // externals: {
  //   'element-ui': 'ELEMENT'
  // },

  // @rewrite webpack setting
  chainWebpack(config) {
    // import function.scss global
    const types = ['vue-modules', 'vue']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
    // TODO: need test preload plugin is correct or not
    // // preload the chunks split by u self or u can remove it
    // config.plugin('preload')
    //   .tap(options => {
    //     // for import() routes use initial https://github.com/vuejs/preload-webpack-plugin
    //     options.include = 'initial'
    //     // or split chunks at the bottom
    //     // options.include = ['chunk-libs', 'chunk-elementUI', 'chunk-commons', 'chunk-date']
    //     return options
    //   })
    config.plugins.delete('preload')
    // remove the prefetch plugin
    config.plugins.delete('prefetch')

    // html template config
    config.plugin('html')
      .tap(args => {
        args[0].title = title
        return args
      })
    
    // set svg-sprite-loader
    config.module
     .rule('svg')
     .exclude.add(resolve('./src/icons'))
     .end()
    config.module
     .rule('icons')
     .test(/\.svg$/)
     .include.add(resolve('./src/icons'))
     .end()
     .use('svg-sprite-loader')
     .loader('svg-sprite-loader')
     .options({
       symbolId: 'icon-[name]'
     })
     .end()
      //1、recommend: split chunks, here we do
      //2、TODO: use .dll which only complie once, about dll(dllPlugin & dllReferencePlugin): https://webpack.js.org/plugins/dll-plugin/#dllplugin    
      config.
        when(isPrd, config => {
          // gzip
          config
            .plugin('compress')
            .use(compressWebpackPlugin, [{
              test: /\.(js|css)$/
            }])

          config
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
            .optimization.splitChunks({
              //  Providing all can be particularly powerful, because it means that chunks can be shared even between async and non-async chunks
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: /[\\/]src[\\/]components[\\/]Base[A-Z]\w+\.(vue|js)$/, // only base components
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true // If the current chunk contains modules already split out from the main bundle, it will be reused instead of a new one being generated. This can impact the resulting file name of the chunk.
                },
                date: {
                  name: 'chunk-date',
                  test: resolve('src/lib'), // date picker lib
                  priority: 4,
                  reuseExistingChunk: true 
                }
              }
            })

        })
  }
}

