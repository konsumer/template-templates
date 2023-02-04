var t=function(t,n){return void 0===n&&(n=[]),new Function("_tpltpl_vars","const {"+n.join(",")+"} = _tpltpl_vars\nreturn `"+t.replace(/`/g,"\\`")+"`")},n=function(n,e){return void 0===e&&(e={}),t(n,Object.keys(e))(e)};n.compile=t;export{t as compile,n as default,n as tpl};
//# sourceMappingURL=template-templates.mjs.map
