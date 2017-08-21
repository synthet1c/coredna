import $ from 'jquery'
import log from '../helpers/log'
import * as pubsub from '../helpers/pubsub'
import Symbols from '../helpers/symbols'
import { initRoutes } from '../decorators/router'

const uid = ((x) => () => (++x).toString(16))(100000)

export default class Coredna {

  constructor () {
      
    if (typeof this.init === 'undefined') {
      throw new Error('init method required on all children of Coredna class')
    }
      
    Object.defineProperty(this, 'uid', { value: uid() })
    
    this.init()
    
    this.ready && $(window).on('ready', this.ready.bind(this))
    this.load && $(window).on('load', this.load.bind(this)) 
  }
}
