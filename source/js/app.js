window.ENV = 'development'

import blog from './Blog'
import news from './News'

import { run } from './coredna/decorators/router'

import log from './coredna/helpers/log'

const test = function (x) {
  return {
    [x]: this[x]
  }
}

blog.on('handleClick', function(html) {
  log.green('on Blog:handleClick', html)
})

blog.on('handleClick', function(html) {
  log.green('on Blog:handleClick(2)', html)
})

blog.getPost({ id: 4 })
  .then(response => log.blue('post promise', response))

news.on('notifyClick', function(e, elem) {
  log.green('on News:notifyClick', { e, elem })
})

news.on('notifyClick', function() {
  log.red('on News:notifyLoad')
})

news.on('notifyAjax', function(...args) {
  log('news ajax yo!', ...args)
})

news.showNews(666)

log.BLUE(
  'tests',
  news.propTest({ thing: 'alice in chains' })
    .then(x => log.purple('then', x))
)

log(
  'Blog::test',
  blog::test('thing')
)

log('classes', {
  blog,
  news
})
