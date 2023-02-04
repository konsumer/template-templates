# template-templates

Use incredibly efficient and stupidly-tiny functions to parse plain [template-string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Your target will [need to support those](https://caniuse.com/#feat=template-literals) for it to work.

It's meant to just be a zero-dependency ultra-tiny way to get compiled templates, using a familiar syntax.

See [it running, here](http://konsumer.js.org/template-templates/).

## really stupidly-tiny

```
206 B: template-templates.cjs.gz
171 B: template-templates.cjs.br
183 B: template-templates.modern.js.gz
161 B: template-templates.modern.js.br
208 B: template-templates.mjs.gz
179 B: template-templates.mjs.br
290 B: template-templates.umd.js.gz
237 B: template-templates.umd.js.br
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
Hi ${name},

${news === 'good'
  ? 'We are delighted to inform you that'
  : 'We regret having to break this bad news to you, but'
} ${reason}

Signed Your Eternal Friends at ${company},
${agent}
```

This is just a regular [template-string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Variables are expanded into the scope.

### node

There are 2 different ways to use it, which are performance-wise about the same:

```js
import tt from 'template-templates'
import { readFile } from 'fs/promises'

// load the file contents
const tstring = await readFile('demo.tpl', 'utf8')

// these are some vars I'm going to pass to the template
const vars = {
  name: 'Mr. Anderson',
  company: 'MetaCortex',
  agent: 'Agent Smith',
  news: 'bad',
  reason: 'your cat died.'
}

// first example, just gimme the string, in one-use:
console.log(tt(tstring, vars))

// second example: compile it for ultimate performance with re-use
// give it a list of valid vars
const template = tt.compile(tstring, Object.keys(vars))

// use it
console.log(template(vars))


/*
Hi Mr. Anderson,

We regret having to break this bad news to you, but your cat died.

Signed Your Eternal Friends at MetaCortex,
Agent Smith
*/

```


If you change your variables for good news, that works too:

```js
const vars = {
  name: 'Mr. Anderson',
  company: 'MetaCortex',
  agent: 'Agent Smith',
  news: 'good',
  reason: 'you won the lottery.'
}

console.log(tt(tstring, vars))

/*
Hi Mr. Anderson,

We are delighted to inform you that you won the lottery.

Signed Your Eternal Friends at MetaCortex,
Agent Smith
*/

```

### browser

You can use it the same way in a browser. Let's imagine you want to fetch that same template, from above:

```html
<script type="module">
import tt from 'https://esm.run/template-templates'

const vars = {
  name: 'Mr. Anderson',
  company: 'MetaCortex',
  agent: 'Agent Smith',
  news: 'bad',
  reason: 'your cat died.'
}

const tstring = await fetch('./demo.tpl').then(r => r.text())

console.log(tt(tstring, vars))
</script>
```

You can also see an example that uses inline-templates, [here](https://github.com/konsumer/template-templates/blob/master/test/demo.html).


### advanced

#### back-ticks

You can use back-ticks directly in your template, if you need to, which normally you would have to escape:

```
This is a markdown string with `code`.
```

#### plugins

You can give it util functions, in it's variables, and use them, if you like. Think of this as "plugins":


```js
import tt from 'template-templates'
import { pluralize } from 'inflection'

const tstring = 'You have ${count} ${pluralize(thing, count)}.'

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

There isn't really a huge performance difference between using `compile` first, or the immediate-mode. The downside is that you have to tell it what variables are going to be valid, but this should be pretty simple, in most cases. This technique shines in a place like a build script, where you want all the template functions, already working, without needing access to file-system to load templates, or have a dependency on `template-templates` in the output:

```js
import tt from 'template-templates'
import glob from 'glob-promise'
import { readFile, writeFile } from 'fs/promises'
import { basename } from 'path'

const out = []
for (const file of await glob('./templates/*.tpl')) {
  const name = basename(file, '.tpl')
  out.push(`export const ${name} = ${tt.compile(await readFile(file, 'utf8'), ['name', 'company', 'agent', 'news', 'reason']).toString()}`))
}

await writeFile('templates.js', out.join('\n\n'))
```

then you can use them later:

```js
import { demo } from './templates.js'

console.log(demo({
  name: 'Mr. Anderson',
  company: 'MetaCortex',
  agent: 'Agent Smith',
  news: 'good',
  reason: 'you won the lottery.'
}))
```

I might use this technique, for example, if I don't want to include `template-templates` in the output, and I don't want to worry about how to work with the filesystem.
