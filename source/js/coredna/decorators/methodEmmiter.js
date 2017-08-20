import pubsub from '../helpers/pubsub'

const methodEmmiter = function (target) {
  Object.getOwnPropertyNames(target.prototype).forEach(key => {
    if (key !== 'constructor' && typeof target.prototype[key] === 'function') {
      const method = target.prototype[key]
      Object.defineProperty(target.prototype, key, {
        value: function(...args) {
          pubsub.emit(`${target.name}.${key}.before`, args)
          const result = method.apply(this, args)
          if (typeof result === 'undefined') {
            pubsub.emit(`${target.name}.${key}`, args)
          }
          else {
            pubsub.emit(`${target.name}.${key}`, [result].concat(args))
          }
        }
      })
    }
  })
}

export default methodEmmiter
