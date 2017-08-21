import Coredna from './coredna/classes/Coredna'

import click from './coredna/decorators/click'
import emit from './coredna/decorators/emit'
import ajax from './coredna/decorators/ajax'
import eventEmmiter from './coredna/decorators/eventEmmiter'
import methodEmmiter from './coredna/decorators/methodEmmiter'
import { route } from './coredna/decorators/router'

import log from './coredna/helpers/log'

@eventEmmiter
class News extends Coredna {

  constructor() {
    super()
    this.thing = 'news'
  }

  init() {
    log.blue('News:init', this)
  }

  @emit('notifyLoad')
  load() {
    log.green('News:load', this)
  }
  
  @route('news/:int')
  @ajax(id => ({ item: 'booyaka', id }))
  showNews(news) {
    log.purple('News:showNews', { news, "this": this })
  }

  @click('h2')
  @emit('notifyClick')
  handleClick(e, elem, data) {
    log.red('News:handleClick', { e, elem, data, self: this })
    return 'handled'
  }

}

export default new News
