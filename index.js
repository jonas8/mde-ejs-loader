var ejs = require('ejs'),
  loaderUtils = require('loader-utils'),
  path = require('path')

module.exports = function(source) {
  this.cacheable && this.cacheable()  
  var query = loaderUtils.parseQuery(this.query)
  var filename = path.relative(process.cwd(), this.resourcePath)
  var includeReg = /\s*include[\('\s]*(\S+)'/g, match
  while (match = includeReg.exec(source)) {
    this.dependency(path.normalize(ejs.resolveInclude(match[1], filename)));
  }
  var defaultOptions = {
    compileDebug: true,
    filename: filename
  }
  var options = this.options.__ejsOptions__ = Object.assign(defaultOptions, this.options.ejs, this.ejs, query)
  var compiler = ejs.compile(source, options)
  return 'module.exports = ' + (
    options.client === true
      ? compiler
      : JSON.stringify(compiler())
    )
}
