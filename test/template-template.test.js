const tt = require('..')
const { readFileSync } = require('fs')

// load the file contents
const tstring = readFileSync(`${__dirname}/demo.tpl`).toString()

// these are some vars I'm going to pass to the template
const newsBad = {
  name: 'Mr. Anderson',
  company: 'MegaCorp',
  agent: 'Agent Smith',
  news: 'bad',
  reason: 'your cat died.'
}

const newsGood = {
  name: 'Mr. Anderson',
  company: 'MegaCorp',
  agent: 'Agent Smith',
  news: 'good',
  reason: 'you won the lottery.'
}

describe('template-template', () => {
  it('should be able to compile a template', () => {
    const template = tt.compile(tstring)
    expect(template(newsBad)).toMatchSnapshot()
  })
  
  it('should be able to compile a template, in immediate mode', () => {
    expect(tt(tstring, newsBad)).toMatchSnapshot()
  })
  
  it('should handle logic of good news', () => {
    expect(tt(tstring, newsGood)).toMatchSnapshot()
  })

  it('should be able to pre-compile templates for export', () => {
    const template = tt.compile(tstring)
    expect(template.toString()).toMatchSnapshot()
  })
})