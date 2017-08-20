import $ from 'jquery'
import log from '../helpers/log'
import * as pubsub from '../helpers/pubsub'
import Symbols from '../helpers/symbols'

const uid = ((x) => () => (++x).toString(16))(100000)

export default class Coredna {

  constructor () {

    this.init && $(this.init.bind(this))
    this.load && $(window).on('load', this.load.bind(this))

    this.uid = uid()

    const events = this[Symbols.events] || []

    events.forEach(({ type, selector, callback }) => {
      $(document).on(type, selector, (e, data) =>
        callback.call(this, e, e.currentTarget, data)
      )
    })

    const emitters = this[Symbols.emitters] || []

    emitters.forEach(({ type, callback }) => {
      pubsub.on(`${this.constructor.name}.${this.uid}.${type}`, callback.bind(this))
    })

  }

}
