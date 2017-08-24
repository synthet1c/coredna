import Coredna from './coredna/classes/Coredna'

import click from './coredna/decorators/click'
import emit from './coredna/decorators/emit'
import ajax from './coredna/decorators/ajax'
import pipe from './coredna/decorators/pipe'
import eventEmmiter from './coredna/decorators/eventEmmiter'
import methodEmmiter from './coredna/decorators/methodEmmiter'
import { route } from './coredna/decorators/router'

import log from './coredna/helpers/log'

const add = a => b => a + b
const multiply = a => b => a * b

const prop = x => obj => obj[x]
const upperCase = x => x.toUpperCase()
const reverse = x => Array.from(x).reverse().join('')

@eventEmmiter
class News extends Coredna {

  constructor() {
    super()
    this.thing = 'news'
  }

  init() {
    log.blue('News:init', this)
  }

  @pipe(add(3), multiply(2))
  test(num) {
    log.GREEN('test', num)
    return num + 1
  }

  @ajax(id => ({ thing: 'booyaka', id }))
  @pipe(
    prop('thing'),
    upperCase
  )
  propTest(x) {
    return log.BLUE('propTest', x)
  }

  @emit('notifyLoad')
  load() {
    log.GREEN('News:load', this)
  }

   /*
   * showNews : Int -> Promise(news)
  */
  @route('news/:int')
  @pipe(add(666), multiply(3))
  @ajax(id => ({ item: 'booyaka', id }))
  @emit('notifyNews')
  showNews(news) {
    return log.purple('News:showNews', { news, "this": this })
  }

  @click('h2')
  @emit('notifyClick')
  handleClick(e, elem, data) {
    log.red('News:handleClick', { e, elem, data, self: this })
    return 'handled'
  }

}

export default new News
