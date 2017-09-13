import { section, div, h3, p } from './coredna/helpers/html'

const TAB = 9;

const posts = [
  { id: 111, user: 'andrew', status: 'done', comment: 'sup' },
  { id: 112, user: 'sharjeel', status: 'done', comment: 'yea boi' },
  { id: 113, user: 'john', status: 'pending' },
  { id: 114, user: 'sharjeel', status: 'done' },
  { id: 115, user: 'andrew', status: 'pending' },
  { id: 115, user: 'alec', status: 'onhold' },
  { id: 66, shit: 'cunt', user: 'john', status: 'shit' },
]

const filter = document.querySelector('#filter')

const regexify = x =>
  new RegExp('.*' + x.split('').join('.*') + '.*', 'i')

const last = x => x[x.length - 1]

const underlay = document.querySelector('#underlay')
const input = document.querySelector('#input')
const output = document.querySelector('#output')

const lookup = posts.reduce((acc, obj) => {
  const keys = Object.keys(obj)
  keys.forEach(key => {
    if (!acc[key]) acc[key] = [];
    if (!acc[key].includes(obj[key])) acc[key].push(obj[key])
  });
  return acc
}, {});

console.log({ lookup })

function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined"
    && typeof document.createRange != "undefined") {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

const pairsToObject = pairs => pairs.reduce((acc, [key, value]) => {
  if (acc[key] == null) {
    acc[key] = []
  }
  acc[key].push(value)
  return acc
} ,{})

const filterOmnibox = fn => e => {
  const text = e.target.innerText;
  const pairs = text.split(/,*\s/).map(x => x.split(':'));
  const params = pairsToObject(pairs)
  return fn({ text, pairs, params })
}

const reg = x => new RegExp(`^${x}`)

const autocompleteKey = (suggestion = '') => {
  const value = input.innerText
  underlay.innerText = value.slice(0, value.lastIndexOf(' ') + 1) + suggestion
}

const autocompleteValue = (suggestion = '') => {
  const value = input.innerText
  underlay.innerText = value.slice(0, value.lastIndexOf(':') + 1) + suggestion
}

const filterItems = items => ({ text, pairs, params }) => {

  // get the search params in order of importance
  const search = Object.keys(params).map(k => [k, params[k]]).sort((a, b) => a[1].length - b[1].length)

  // filter the items by the search pairs
  const results = search.reduce((acc, [k, values]) => {
    return acc.filter(
      obj => {
        let value = obj[k]
        if (value == null) return false
        if (typeof value === 'number') {
          return values.find(x => {
            if (!x) return false
            if (x[0] === '>') {
              const comparitor = x[0]
              const v = Number(x.slice(1))
              return value > v
            }
            else {
              return values.find(x => x == value)
            }
          })
        }
        return values.find(x => reg(x).test(value))
      })
  }, items)

  // get the latest search params
  const [ key, value ] = last(pairs)

  if (!key && !value)
    underlay.innerText = ''

  if (key && value == null) {
    autocompleteKey(Object.keys(lookup).find(x => reg(key).test(x)))
  }

  const suggestion = value && results.find(obj => reg(value).test(obj[key]))
  if (key && value != null) {
    // find the first matching value iin the results
    autocompleteValue(lookup[key] && lookup[key].find(x => reg(value).test(x)))
  }

  // check if we have an exact match
  if (value && value === suggestion) {
    console.log('exact match', key, value)
  }

  // if there is new results remake the html
  if (results.length)
  output.innerHTML = ''

  results.map(obj =>
    section('.post' + '.' + obj.status,
      div('.post__inner',
        div('.post__content',
          h3('.post__heading', obj.user),
          p('.post__copy', obj.comment || 'no comment')
        )
      )
    )
  ).forEach(::output.appendChild)

  console.log({ items, text, pairs, params, results, suggestion, search })
}

const onTab = e => {
  if (e.keyCode !== TAB) return true
  e.preventDefault();
  input.innerText = underlay.innerText
  placeCaretAtEnd(input)
}

input.addEventListener('keyup', filterOmnibox(filterItems(posts)), false);
input.addEventListener('keydown', onTab, false);
