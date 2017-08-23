import * as Symbols from '../helpers/symbols'
import $ from 'jquery'
import log from '../helpers/log'

const $on = (type, selector) => (target, key, descriptor) => {
  const init = target.init
  const callback = descriptor.value

  // save events to the prototype
  // decorate the init method or create it
  Object.defineProperty(target, 'init', {
    value: function() {
      // run the original init function
      const result = typeof init === 'function' && init.apply(this, arguments)
      // int the events with the correct context set
      $(document).on(type, selector, (e, data) => {
        log.event(type, selector, e)
        return callback.call(this, e, e.currentTarget, data)
      })
      return {
        ...descriptor,
        value: function() {
          return callback.apply(this, arguments)
        }
      }
    }
  })
  return {
    ...descriptor,
    value: function() {
      return callback.apply(this, arguments)
    }
  }
}

export default $on
