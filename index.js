// return a compiled template function
export const compile = (template, params=[]) => new Function('_tpltpl_vars', 'const {' + params.join(',') + '} = _tpltpl_vars\nreturn `' + template.replace(/`/g, '\\`') + '`')


// immediate return, default export
export const tpl = (template, variables={}) => compile(template, Object.keys(variables))(variables)

tpl.compile = compile

export default tpl