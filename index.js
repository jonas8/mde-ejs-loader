var ejs = require('ejs'),
  loaderUtils = require('loader-utils'),
  path = require('path')

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query)
  var options = this.options.__ejsOptions__ = Object.assign({}, this.options.ejs, this.ejs, query)
  options.filename = path.relative(process.cwd(), this.resourcePath);
  var compiler = ejs.compile(source, options)
  return 'module.exports = ' + (
    options.client === true
      ? compiler
      : JSON.stringify(compiler())
    )
}
