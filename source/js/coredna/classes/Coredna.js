import $ from 'jquery'
import log from '../helpers/log'
import * as pubsub from '../helpers/pubsub'
import Symbols from '../helpers/symbols'
import { initRoutes } from '../decorators/router'

const uid = ((x) => () => (++x).toString(16))(100000)

export default class Coredna {

  constructor () {

    this.init && this.init()
    this.ready && $(window).on('ready', this.ready.bind(this))
    this.load && $(window).on('load', this.load.bind(this))

    this.uid = uid()
    
    this[Symbols.initEvents] && this[Symbols.initEvents]()
    this[Symbols.initRoutes] && this[Symbols.initRoutes]()
  
  }

}
