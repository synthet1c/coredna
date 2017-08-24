import wrap from './wrap'

const before => wrap(function(original, ...args) {
  const ret = fn.apply(this, args)
  return original.call(this, ret, ...args)
})

export default before
