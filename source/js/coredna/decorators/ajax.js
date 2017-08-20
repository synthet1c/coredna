import $ from 'jquery'
import wrap from './wrap'

const $ajax = config => wrap(function(original, params) {
  $.ajax($.extend(config, params))
    .done((response, jxhr) => original.call(this, response, jxhr, ...args))
    .fail(e =>
      log.red('ajax error: ', e)
    )
})
/*
export const ajax = config => wrap(function(original, params) {
  const self = this
  setTimeout(() =>
    original.call(self, $.extend(config, params))
  , 200)
})
*/

export const ajax = config => (target, key, descriptor) => ({
  ...descriptor,
  value: function(params) {
    return new Promise((res,rej) => {
      setTimeout(() => {

        const obj = typeof config === 'function'
          ? config(params)
          : Object.assign({}, config, params)

        descriptor.value.call(this, obj)
        res(obj)
      }, 400)
    })
  }
})

export default ajax
