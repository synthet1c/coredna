import blog from './Blog'
import news from './News'

import log from './coredna/helpers/log'

blog.on('handleClick', function(e, elem ) {
  log.green('on Blog:handleClick', { e, elem })
})

blog.getPost({ id: 4 })
  .then(response => log.blue('post promise', response))

news.on('notifyClick', function(e, elem) {
  log.green('on News:notifyClick', { e, elem })
})

console.log({ blog, news })

// blog.handleClick('e', 'h1', 'data')
