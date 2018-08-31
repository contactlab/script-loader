const path = require('path');

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    webpack: {
      mode: 'production',
      module: {
        rules: [
          {
            include: [
              path.resolve(__dirname, 'src'),
              path.resolve(__dirname, 'test')
            ],
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    },
    files: [
      'test/init.js',
      'src/loader.js',
      'test/loader.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/*.js': ['webpack'],
      'test/*.js': ['webpack']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--no-sandbox', '--remote-debugging-port=9222', 'http://0.0.0.0:9876/']
      }
    },
    singleRun: true,
    concurrency: Infinity
  });
};
