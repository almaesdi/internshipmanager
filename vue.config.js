module.exports = {
    pluginOptions: {
      electronBuilder: {
        preload: 'src/preload.js'
      }
    },
    //Ignore hotreload in those directories (ignore hotreload when data.db is changed)
    configureWebpack: {
      devServer: {
        watchOptions: {
          ignored: [/node_modules/, /public/],
        }
      }
    }
  }