import Symbols from '../helpers/symbols'

const routes = []

 /*
 * regexify
 *
 * convert a uri into a regular expression
 * @sig String -> RegExp
*/
const regexify = uri => uri.replace(/(:\w+)/, (_, word) => {
  switch (word) {
    case ':int':
      return '([0-9]+)'
    case ':string':
      return '([a-zA-Z-_]+)'
    default:
      return '([a-zA-Z0-9-_]+)'
  }
})

 /*
 * typeify
 *
 * convert a uri to an array of Types for testing
 * @sig String -> [Number|String|Object]
*/
const typeify = uri =>
  [...uri.match(/(:\w+)/)].slice(1)
    .map(type => {
      switch (type) {
        case ':int':
          return 'number'
        case ':string':
          return 'string'
        default:
          return 'string'
      }
    })

 /*
 * @run
 *
 * this function will run the route
*/
export function run(uri) {
  const route = routes.find(route => route.reg.test(uri))
  if (route) {
    const args = [].concat(uri.match(route.reg))
      .slice(1)
      .map(x => !isNaN(Number(x)) ? Number(x) : String(x))
    return route.fn.apply(route.context, args)
  }
}

 /*
 * initRoutes
 *
 * this function will initialize the routes when a Core dna object
 * is instantiated passing in the route context
 * 
 * _routes can be obtained with the Symbol('routes') on the instance
 * prototype
*/
export const initRoutes = function (_routes, context) {
  _routes.forEach(route => {
    routes.push({
      ...route,
      context
    })
  })
}

 /*
 * @route
 * @type decorator
 *
 * this will decorate an object method with a router that
 * will call the decorated function when the href matches
*/
export function route(uri) {
  return function(target, name, descriptor) {

    const fn = descriptor.value
    const reg = new RegExp('^' + regexify(uri) + '$')
    const types = typeify(uri)
    
    if (!target[Symbols.routes]) target[Symbols.routes] = [] 
    
    target[Symbols.routes].push({
      fn, reg, types, uri
    })

    return {
      ...descriptor,
      value: function(...args) {
        // ensure the calling functions args are the correct type
        const argsSameType = args.every((arg, ii) => typeof(arg) === types[ii])

        if (true || argsSameType) {
          return fn.apply(this, args)
        }
      }
    }
  }
}

// init the hashchange listener
window.addEventListener('hashchange', function(e) {
  run(window.location.hash.slice(1))
})

run(window.location.hash.slice(1))

export default {
  route,
  run
}