import Coredna from './coredna/classes/Coredna'

import click from './coredna/decorators/click'
import emit from './coredna/decorators/emit'
import ajax from './coredna/decorators/ajax'
import pipe from './coredna/decorators/pipe'
import eventEmmiter from './coredna/decorators/eventEmmiter'
import methodEmmiter from './coredna/decorators/methodEmmiter'
import { route } from './coredna/decorators/router'

import $ from 'jquery'

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

  load() {
    this.initImages('li')
  }

  initImages(selector) {
    $(selector).each(function(css) {
      const $this = $(this)
      $this.css({
        background: 'red',
        color: 'white'
      })
      .addClass('loaded')
    })
  }

  @pipe(add(3), multiply(2))
  test(num) {
    log.GREEN('test', num)
    return num + 1
  }

  @pipe(prop('thing'), upperCase)
  @ajax(id => ({ thing: 'booyaka', id }))
  propTest(x) {
    return log.BLUE('propTest beech', x)
  }

   /*
   * showNews : Int -> Promise(news)
  */
  @route('news/:int')
  @ajax(id => ({ item: 'booyaka', id }))
  @emit('notifyNews') // emit is causing shawNews to be called twice
  showNews(news) {
    return log.purple('News:showNews:net', { news, "this": this })
  }

  @click('h2')
  @emit('notifyClick')
  handleClick(e, elem, data) {
    return 'handled'
  }

}

export default new News
