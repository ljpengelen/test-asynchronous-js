const buble = require("rollup-plugin-buble");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");

module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['mocha', 'chai'],
    files: ['test/**/*.spec.js'],
    exclude: [],
    preprocessors: {
      "test/**/*.spec.js": ["rollup"]
    },
    rollupPreprocessor: {
      plugins: [buble({ transforms: { forOf: false } }), resolve(), commonjs()],
      output: {
        format: "iife",
				name: "ips",
				sourcemap: "inline"
      }
    },
    reporters: ['mocha'],
    client: {
      mocha: {
        reporter: "html"
      }
    },
    mochaReporter: {
      showDiff: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },
    singleRun: false,
    concurrency: Infinity
  })
}
