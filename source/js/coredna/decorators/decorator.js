import decoratorCompose from './decoratorCompose'

const decorator = cb => (target, key, { enumerable, configurable, value: fn }) => ({
  enumerable,
  configurable,
  value(...args) {
    const result = cb.apply(this, args)

    if (fn instanceof Promise) {
      return result != null
        ? Promise.resolve(result)
        : Promise.reject()
    }

    if (typeof fn.map === 'function') {
      return fn.map(cb)
    }

    return result != null
      ? fn(result)
      : void 0
  }
})

export default decorator
