import * as pubsub from '../helpers/pubsub'
import Symbols from '../helpers/symbols'

const emit = type => (target, key, descriptor) => {
  return {
    ...descriptor,
    value: function(...args) {
      const ret = descriptor.value.apply(this, args)
      const callbackArgs = typeof ret !== 'undefined'
        ? [ret].concat(args)
        : args

      pubsub.emit(`${this.constructor.name}.${type}`, this, args)
    }
  }
}

export default emit
