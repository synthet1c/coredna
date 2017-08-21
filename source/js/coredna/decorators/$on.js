import * as Symbols from '../helpers/symbols'
import $ from 'jquery'

const $on = (type, selector) => (target, key, descriptor) => {
  if (!target[Symbols.events]) {
    Object.defineProperty(target, Symbols.events, { value: [] }) 
    Object.defineProperty(target, Symbols.initEvents, {
      value: function() {
        const events = this[Symbols.events] || []
        events.forEach(({ type, selector, callback }) => {
          $(document).on(type, selector, (e, data) =>
            callback.call(this, e, e.currentTarget, data)
          )
        })
      }
    })
  }
  target[Symbols.events].push({
    type,
    selector,
    callback: descriptor.value
  })
  return descriptor
}

export default $on
