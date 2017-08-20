import Coredna from './coredna/classes/Coredna'

import { div, h3, p, span, section, text, list } from './coredna/helpers/html'

import ajax from './coredna/decorators/ajax'
import click from './coredna/decorators/click'
import emit from './coredna/decorators/emit'
import after from './coredna/decorators/after'
import bind from './coredna/decorators/bind'
import eventEmmiter from './coredna/decorators/eventEmmiter'
import methodEmmiter from './coredna/decorators/methodEmmiter'

import log from './coredna/helpers/log'


const unary = fn => x => fn(x)
const heading = title => h3('.heading', span('.heading__copy', title))

@eventEmmiter
class Blog extends Coredna {

  constructor () {
    super()
    this.thing = 'blog'
    this.root = document.body
  }

  init() {
    this.getPost({ id: 666 })
  }

  @ajax(
    params => ({
      ...params,
      action: 'blog',
      name: 'es6 and beyond',
      posts: [
        'Decorators are awesome!',
        'Not sure about the class keyword!',
        'Functional js is the sheez',
      ]
    })
  )
  getPost(post) {
    return this.renderPost({
      ...post,
      value: `$` + post.id
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

  renderPost({ id, action, name, value, posts }) {
    return log.purple('html',
      this.root.appendChild(
        section(`#post_${id}.post`, { id, value },
          h3('.post__heading', { onclick: this.test },
            span('.post__heading_copy', name)
          ),
          section('.posts',
            div('.posts__inner',
              div('.posts__content',
                list('.post', posts.map(heading))
              )
            )
          ),
          p('.post__copy',
            span('.post__id', 'id: ', id),
            span('.post_value', 'value: ', value),
            text('.post__input', { name: 'post_id', value, onkeyup: this.onkeyup })
          )
        )
      )
    )
  }

  @click('h1')
  @after('handleClick')
  handleClick(e, elem) {
    log.blue('Blog:handleClick', { e, elem })
    return (
      section('.click',
        div('.click__content', e.target.innerText)
      )
    )
  }
}

export default new Blog
