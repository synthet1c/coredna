import * as pubsub from '../helpers/pubsub'

const emit = type => (target, key, { configurable, enumerable, value: fn }) => {
  const init = target.init
  Object.defineProperty(target, 'init', {
    value: function() {
      const result = init.apply(this, arguments)
      pubsub.on(`${this.constructor.name}.${this.uid}.${type}`, fn)
      return result
    }
  })
  return {
    configurable,
    enumerable,
    value: function(...args) {
      // const ret = fn.apply(this, args)
      // const callbackArgs = typeof ret !== 'undefined'
      //   ? [ret].concat(args)
      //   : args

      pubsub.emit(`${this.constructor.name}.${this.uid}.${type}`, this, args)
    }
  }
}

export default emit
