import * as pubsub from '../helpers/pubsub'

const emit = type => (target, key, descriptor) => {
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
