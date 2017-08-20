import blog from './Blog'
import news from './News'

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

console.log(
  blog::test('thing')
)

console.log({
  blog,
  news
})
