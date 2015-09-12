var OpenBrowserPlugin = require('./index');

module.exports = {
  entry: './lib/entry.js',
  output: {
    path: __dirname + "/bundle/",
    filename: "bundle.js"
  },
  plugins: [
    new OpenBrowserPlugin()
  ]
};