const lazy = (clazz, name, descriptor) => {
  console.log('lazy', { clazz, name, descriptor })
  return ({
    get(...args) {
      return descriptor.initializer()
    }
  })
}

export default lazy
