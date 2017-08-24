const pipe = (...fns) => (target, key, descriptor) => ({
  value: function(x) {
    return fns.concat(descriptor.value).reduce((x, fn) => {
      return fn.call(this, x)
    }, x)
  }
})

export default pipe
