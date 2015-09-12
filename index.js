// TODO: add jsdoc
var open = require('open');

function removeFromArray(array, item) {
  var index = array.indexOf(item);
  return index >= 0 ? array.splice(index, 1) : false;
}

// TODO: Change name
function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {
  var isWatching = false;

  compiler.plugin('watch-run', function checkWatchingMode(watching, done) {
    isWatching = true;
    removeFromArray(watching.compiler._plugins['watch-run'], checkWatchingMode);
    done();
  });

  compiler.plugin('done', function doneCallback(stats) {
    if (isWatching && !stats.hasErrors()) {
      removeFromArray(stats.compilation.compiler._plugins.done, doneCallback);
      console.log('opening!!!!'); // TODO: Open browser here!!!
    }
  });
};

module.exports = MyPlugin;
