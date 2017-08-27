const promisify = (target, key, { configurable, enumerable, value: fn }) => ({
  configurable,
  enumerable,
  value() {

    if (fn instanceof Promise)
      return fn

    const result = fn.apply(this, arguments)

    if (result instanceof Promise)
      return result

    return result != null
      ? Promise.resolve(result)
      : Promise.reject('could not resolve Promise')
  }
})

export default promisify
