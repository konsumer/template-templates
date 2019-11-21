# template-templates

Use incredibly efficient and stupidly-tiny functions to parse plain [template-string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

It's meant to just be a zero-dependency ultra-tiny way to get compiled templates, using a familiar syntax.

## installation

Add it to you project:

```
npm i template-templates
```

## usage

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

```
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
<!-- TODO -->
```

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

const tstring = 'You have ${vars.count} ${pluralize(vars.thing, vars.count)}.'

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