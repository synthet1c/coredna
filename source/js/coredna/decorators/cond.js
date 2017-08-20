const cond = predicate => x => (clazz, name, descriptor) => ({
  ...descriptor,
  value: function(...args) {
    if (predicate(x)) {
      descriptor.value.apply(this, args)
    }
  }
})

export default cond
