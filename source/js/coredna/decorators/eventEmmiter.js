import pubsub from '../helpers/pubsub'

const events = function(target) {
  Object.defineProperties(target.prototype, {
    on: {
      value: function(event, fn) {
        const self = this
        pubsub.on(`${this.constructor.name}.${this.uid}.${event}`, function(...args) {
          return fn.apply(self, args)
        })
      }
    },
    emit: {
      enumerable: false,
      value: function(event, ...args) {
        pubsub.emit(`${this.constructor.name}.${this.uid}.${event}`, this, ...args)
      }
    }
  })
}

export default events
