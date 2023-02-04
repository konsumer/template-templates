const t=(t,e=[])=>new Function("_tpltpl_vars","const {"+e.join(",")+"} = _tpltpl_vars\nreturn `"+t.replace(/`/g,"\\`")+"`"),e=(e,n={})=>t(e,Object.keys(n))(n);e.compile=t;export{t as compile,e as default,e as tpl};
//# sourceMappingURL=template-templates.modern.js.map
