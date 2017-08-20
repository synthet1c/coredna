/*********************************************************************\
                               utilities
\*********************************************************************/

const el = curryRest(createElement)

export default el

export const p = el('p')
export const h3 = el('h3')
export const div = el('div')
export const pre = el('pre')
export const span = el('span')
export const section = el('section')

export const label = el('label')
export const text = (selector, attrs) =>
  el('input', selector, Object.assign(attrs, { type: 'text' }))

 /*
 * createElement
 *
 * recurse through element tree and return DOM html
 *
 * @param  {String}  type  element node name
 * @param  {String}  selector  css selector to apply to the element
 * @param  {Object|HTMLElement}  ...children  attrs to apply, or children
*/
function createElement(type, selector, children) {
  const element = document.createElement(type)
  applySelector(selector, element)
  if (children[0].constructor === Object) {
    applyAttributes(children.shift(), element)
  }
  children.forEach(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      child = document.createTextNode(child)
    }
    element.appendChild(child)
  })
  return element
}

function pascalCase(str) {
  return str.replace(/([A-Z])/gm, (_, char) => '-' + char.toLowerCase())
}

 /*
 * curryRest
 *
 * curry function with last named argument transformed
 * into an array
 *
 * @param  {Function}  fn  function to curry
*/
function curryRest(fn) {
  const ll = fn.length
  return (function _curry(cache){
    return (...args) => {
      const all = cache.concat(args)
      return all.length < ll
        ? _curry(all)
        : fn(...[].concat(all.slice(0,ll - 1), [all.slice(ll - 1)]))
    }
  })([])
}

 /*
 * applySelector
 *
 * add selectors to the input element using css selectors
 *
 * @param  {string}  selector  css selector to apply to element
 * @param  {HTMLElement}  element  html element to add classes to
*/
function applySelector(selector, element) {
	selector.replace(/(\.|\#)*([\w\d-_]+)/g, (_, type, name) => {
		switch (type) {
			case '.':
				element.classList.add(name)
				break;
      case '#':
			default:
				element.id = name
		}
	})
}

const isObject = x => x.toString() === '[object Object]'


 /*
 * applyAttributes
 *
 * add attributes to an element, non native attributes are applied
 * as data-attr
 *
 * @param  {Object}  attrs  attributes to apply to element
 * @param  {HTMLElement}  element  element to apply attributes to
*/
function applyAttributes(attrs, element) {
	Object.keys(attrs).forEach(attr => {
    const value = isObject(attrs[attr])
      ? JSON.stringify(attrs[attr])
      : attrs[attr]

    if (typeof value === 'function') {
      const name = attr.indexOf('on') === 0 ? attr.replace('on', '') : 'click'
      element.addEventListener(name, value, false)
    }
		else if (attr !== 'id' && attr !== 'class' && attr in element) {
			element[attr] = value
		}
		else {
			element.dataset[attr] = value
		}
	})
}
