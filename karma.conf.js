process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/fetch-mock/dist/es5/client-bundle.js',
      'test/init.js',
      'src/loader.js',
      'test/loader.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'src/loader.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};
