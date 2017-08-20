import wrap from './wrap'

const = fn => wrap(function(original, ...args) {
  const ret = fn.apply(this, args)
  return original.call(this, ret, ...args)
})

export default before
