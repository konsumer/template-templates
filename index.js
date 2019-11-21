// return a compiled template function
const compile = function(template){
  return new Function('vars', 'return `' + template.replace(/`/g, '\\`') + '`')
}

// immediate return, default export
const tpl = function(template, variables){
  return compile(template)(variables)
}

const out = tpl
out.compile = compile

export default out