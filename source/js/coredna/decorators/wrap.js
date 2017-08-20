const wrap = fn => (target, key, descriptor) => ({
  ...descriptor,
  value: function(...args) {
    return fn.call(this, descriptor.value, ...args)
  }
})

export default wrap
