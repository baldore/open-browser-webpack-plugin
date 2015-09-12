var open = require('open');

var DEFAULT_BROWSER = undefined;

/**
 * Removes an element from the an array if exist.
 * @param {Array} array
 * @param {*} item Item to delete
 * @returns {*} removed item if was found. False otherwise.
 */
function removeFromArray(array, item) {
  var index = array.indexOf(item);
  return index >= 0 ? array.splice(index, 1) : false;
}

/**
 * Opens the browser the first time if there's no compilation errors.
 * @param {Object} options Options object.
 * @param {String} [options.browser] Browser to use. If not available, use default browser.
 * @param {String} [options.url] url to open in browser.
 * @constructor
 */
function OpenBrowserPlugin(options) {
  options || (options = {});
  this.browser = options.browser || DEFAULT_BROWSER;
  this.url = options.url || false;
}

OpenBrowserPlugin.prototype.apply = function(compiler) {
  var isWatching = false;

  compiler.plugin('watch-run', function checkWatchingMode(watching, done) {
    isWatching = true;
    removeFromArray(watching.compiler._plugins['watch-run'], checkWatchingMode);
    done();
  });

  compiler.plugin('done', function doneCallback(stats) {
    if (isWatching && !stats.hasErrors()) {
      removeFromArray(stats.compilation.compiler._plugins['done'], doneCallback);
      console.log('opening!!!!'); // TODO: Open browser here!!!
    }
  });
};

module.exports = OpenBrowserPlugin;
