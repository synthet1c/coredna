import Coredna from './coredna/classes/Coredna'

import click from './coredna/decorators/click'
import emit from './coredna/decorators/emit'
import eventEmmiter from './coredna/decorators/eventEmmiter'
import methodEmmiter from './coredna/decorators/methodEmmiter'

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

  @click('h2')
  @emit('notifyClick')
  handleClick(e, elem, data) {
    log.red('News:handleClick', { e, elem, data, self: this })
    return 'handled'
  }

}

export default new News
