import tt from '../index.js'
import { readFile } from 'fs/promises'
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// load the file contents
const tstring = await readFile(`${__dirname}/demo.tpl`, 'utf8')

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

// [ 'name', 'company', 'agent', 'news', 'reason' ]
const params = Object.keys(newsBad)

describe('template-template', () => {
  it('should be able to compile a template', () => {
    const template = tt.compile(tstring, params)
    expect(template(newsBad)).toMatchSnapshot()
  })
  
  it('should be able to compile a template, in immediate mode', () => {
    expect(tt(tstring, newsBad)).toMatchSnapshot()
  })
  
  it('should handle logic of good news', () => {
    expect(tt(tstring, newsGood)).toMatchSnapshot()
  })

  it('should be able to pre-compile templates for export', () => {
    const template = tt.compile(tstring, params)
    expect(template.toString()).toMatchSnapshot()
  })

  it('should be cool with backticks', () => {
    const tstring2 = 'This is a markdown string with `code`.'
    expect(tt(tstring2)).toMatchSnapshot()
  })
})