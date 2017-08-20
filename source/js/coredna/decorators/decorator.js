import decoratorCompose from './decoratorCompose'

const decorator = fn => (...decoratorArgs) => (clazz, name, descriptor) => ({
  ...descriptor,
  value: decoratorCompose(fn, descriptor.value)(decoratorArgs)
})

export default decorator
