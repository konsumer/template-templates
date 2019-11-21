# template-templates

Use incredibly efficient and stupidly-tiny functions to parse plain [template-string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Your target will [need to support those](https://caniuse.com/#feat=template-literals) for it to work.

It's meant to just be a zero-dependency ultra-tiny way to get compiled templates, using a familiar syntax.

## really stupidly-tiny

```
133 B: template-templates.js.gz
 99 B: template-templates.js.br
133 B: template-templates.mjs.gz
100 B: template-templates.mjs.br
213 B: template-templates.umd.js.gz
160 B: template-templates.umd.js.br
```

## installation

Add it to you project:

```
npm i template-templates
```

## usage

*TLDR*: If you just want to see a code-example, have a look at the [unit-test](https://github.com/konsumer/template-templates/blob/master/test/template-template.test.js)

First, let's imagine we have a file named `demo.tpl` that looks like this:

```
Hi ${vars.name},

${vars.news == 'good' ? 'We are delighted to inform you that' : 'We regret having to break this bad news to you, but'} ${vars.reason}

Signed Your Eternal Friends at ${vars.company},
${vars.agent}
```

This is just a regular [template-string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). `vars` is the input.

### node

There are 2 different ways to use it, which are performance-wise about the same:

```js
const tt = require('template-templates')
const { readFileSync } = require('fs')

// load the file contents
const tstring = readFileSync('demo.tpl').toString()

// these are some vars I'm going to pass to the template
const vars = {
  name: 'Mr. Anderson',
  company: 'MegaCorp',
  agent: 'Agent Smith',
  news: 'bad',
  reason: 'your cat died.'
}

// first example, just gimme the string, in one-use:
console.log(tt(tstring, vars))

// second example: compile it for ultimate performance with re-use
const template = tt.compile(tstring)

// use it
console.log(template(vars))


/*
Hi Mr. Anderson,

We regret having to break this bad news to you, but your cat died.

Signed Your Eternal Friends at MegaCorp,
Agent Smith
*/

```


If you change your variables for good news, that works too:

```js
const vars = {
  name: 'Mr. Anderson',
  company: 'MegaCorp',
  agent: 'Agent Smith',
  news: 'good',
  reason: 'you won the lottery'
}

console.log(tt(tstring, vars))

/*
Hi Mr. Anderson,

We are delighted to inform you that you won the lottery.

Signed Your Eternal Friends at MegaCorp,
Agent Smith
*/

```

### browser

You can use it the same way in a browser. Let's imagine you want to fetch that same template, from above:

```html
<script src="https://unpkg.com/template-templates"></script>
<script>
async function run(){
  const vars = {
    name: 'Mr. Anderson',
    company: 'MegaCorp',
    agent: 'Agent Smith',
    news: 'bad',
    reason: 'your cat died.'
  }
  const tstring = await (await fetch('./dmeo.tpl')).text()

  const template = TemplateTemplates.compile(tstring)
  console.log(template(vars))

  // or
  
  console.log(TemplateTemplates(tstring, vars))
}
run()
</script>
```

You can also see an example that uses inline-templates, [here](https://github.com/konsumer/template-templates/blob/master/test/demo.html).

### advanced

#### back-ticks

You can use back-ticks directly in your template, if you need to:

```
This is a markdown string with `code`.
```

#### plugins

You can also give it util functions, in it's variables, and use them, if you like. Think of this as "plugins":


```js
const tt = require('template-templates')
const { pluralize } = require('inflection')

const tstring = 'You have ${vars.count} ${vars.pluralize(vars.thing, vars.count)}.'

const vars = {
  pluralize,
  count: 10,
  thing: 'marble'
}

console.log(tt(tstring, vars))

/*
You have 10 marbles.
*/
```

#### pre-compiling

There isn't really a performance difference between using `compile` first, or the immediate-mode. This technique shines in a place like a build script, where you want all the template functions, already working, without needing access to file-system or have a dependency on `template-templates` in the output :

```js
const tt = require('template-templates')
const glob = require('glob').sync
const { readFileSync, writeFileSync } = require('fs')
const { basename } = require('path')

const out = glob(`${__dirname}/templates/*.tpl`)
  .map(file => `module.exports.${basename(file, '.tpl')} = ` + tt.compile(readFileSync(file).toString()).toString())
  .join('\n')

writeFileSync('templates.js', out)

```

then you can use them later:

```js
const { demo } = require('./templates')

console.log(demo({
  name: 'Mr. Anderson',
  company: 'MegaCorp',
  agent: 'Agent Smith',
  news: 'good',
  reason: 'you won the lottery'
}))
```

I might use this technique in a lambda, for example, if I don't want to include `template-templates` in the output, and I don't want to worry about how to work with the filesystem.