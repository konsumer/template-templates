// return a compiled template function
const compile = function(template){
  return new Function('vars', 'return `' + template.replace(/`/g, '\\`') + '`')
}

// immediate return, default export
const tpl = function(template, variables){
  return compile(template)(variables)
}

module.exports = tpl
module.exports.compile = compile