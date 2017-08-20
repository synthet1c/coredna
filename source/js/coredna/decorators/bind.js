const bind = (target, key, { configurable, enumerable, value: fn }) => ({
  configurable,
  enumerable,
  get() {
    if (this === target) {
      return fn
    }

    if (this.constructor !== target.constructor && getPrototypeOf(this).constructor === constructor) {
      return fn
    }

    const boundFn = fn.bind(this)

    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: boundFn
    })
    return boundFn
  },
  set(value) {
    Object.defineProperty(target, key, {
      configurable: true,
      writable: true,
      enumerable: false,
      value
    })
    return value
  }
})

export default bind
