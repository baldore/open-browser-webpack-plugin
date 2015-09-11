function MyPlugin() {}

MyPlugin.prototype.apply = function(compiler) {
  console.log(compiler);
};

module.exports = MyPlugin;


