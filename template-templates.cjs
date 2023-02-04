var t=function(t,e){return void 0===e&&(e=[]),new Function("_tpltpl_vars","const {"+e.join(",")+"} = _tpltpl_vars\nreturn `"+t.replace(/`/g,"\\`")+"`")},e=function(e,n){return void 0===n&&(n={}),t(e,Object.keys(n))(n)};e.compile=t,exports.compile=t,exports.default=e,exports.tpl=e;
//# sourceMappingURL=template-templates.cjs.map
