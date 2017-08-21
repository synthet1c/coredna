import * as pubsub from '../helpers/pubsub'

const emit = type => (target, key, descriptor) => {
  const init = target.init
  Object.defineProperty(target, 'init', {
    value: function() {
      const result = init.apply(this, arguments)
      pubsub.on(`${this.constructor.name}.${this.uid}.${type}`, descriptor.value)
      return result
    }
  })
  return {
    ...descriptor,
    value: function(...args) {
      const ret = descriptor.value.apply(this, args)
      const callbackArgs = typeof ret !== 'undefined'
        ? [ret].concat(args)
        : args

      pubsub.emit(`${this.constructor.name}.${this.uid}.${type}`, this, args)
    }
  }
}

export default emit
