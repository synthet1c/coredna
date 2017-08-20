import * as Symbols from '../helpers/symbols'

const $on = (type, selector) => (target, key, descriptor) => {
  if (!target[Symbols.events]) target[Symbols.events] = []
  target[Symbols.events].push({
    type,
    selector,
    callback: descriptor.value
  })
  return descriptor
}

export default $on
