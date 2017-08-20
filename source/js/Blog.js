import Coredna from './coredna/classes/Coredna'

import { div, h3, p, span, section, text } from './coredna/helpers/html'

import ajax from './coredna/decorators/ajax'
import click from './coredna/decorators/click'
import emit from './coredna/decorators/emit'
import after from './coredna/decorators/after'
import bind from './coredna/decorators/bind'
import eventEmmiter from './coredna/decorators/eventEmmiter'
import methodEmmiter from './coredna/decorators/methodEmmiter'

import log from './coredna/helpers/log'

@eventEmmiter
class Blog extends Coredna {

  constructor () {
    super()
    this.thing = 'blog'
  }

  init() {
    this.getPost({ id: 666 })
  }

  @ajax({ action: 'blog', name: 'Get a dog up ya!' })
  getPost(post) {
    return this.renderPost({
      ...post,
      value: `$${post.id}`
    })
  }

  @bind
  test(e) {
    log.blue('test', {  e, "this": this })
  }

  @bind
  onkeyup(e) {
    log.purple(e.target.value)
  }

  renderPost(post) {
    const { id, action, name, value } = post
    const { onkeyup } = this
    return log.purple('html',
      document.body.appendChild(
        section(`#post_${id}.post`, { id, value },
          h3('.post__heading', { onclick: this.test },
            span('.post__heading_copy', name)
          ),
          p('.post__copy',
            span('.post__id', 'id: ', id),
            span('.post_value', 'value: ', value),
            text('.post__input', { name: 'post_id', value, onkeyup })
          )
        )
      )
    )
  }

  @click('h1')
  @after('handleClick')
  handleClick(e, elem) {
    log.blue('Blog:handleClick', { e, elem })
    return section('.click',
      div('.click__content', e.target.innerText)
    )
  }
}

export default new Blog
