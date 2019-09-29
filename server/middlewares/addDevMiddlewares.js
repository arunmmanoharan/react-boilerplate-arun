const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxyMiddleware = require('http-proxy-middleware');

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    publicPath,
    silent: true,
    stats: 'errors-only',
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath,
  );

  const devConfig = webpackConfig.devServer;

  if (devConfig.proxy) {
    Object.keys(devConfig.proxy).forEach(function(context) {
      app.use(proxyMiddleware(context, devConfig.proxy[context]));
    });
  }
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const fs = middleware.fileSystem;

  if (devConfig.historyApiFallback) {
    console.log('404 responses will be forwarded to /index.html');

    app.get('*', (req, res) => {
      fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      });
    });
  }
};
