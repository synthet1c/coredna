import { section, div, h3, p } from './coredna/helpers/html'

const posts = [
  { id: 66, shit: 'cunt', user: 'john', status: 'shit' },
  { id: 111, user: 'andrew', status: 'done', comment: 'sup' },
  { id: 112, user: 'sharjeel', status: 'done', comment: 'yea boi' },
  { id: 113, user: 'john', status: 'pending' },
  { id: 114, user: 'sharjeel', status: 'done' },
  { id: 115, user: 'andrew', status: 'pending' },
]


const filter = document.querySelector('#filter')

const regexify = x =>
  new RegExp('.*' + x.split('').join('.*') + '.*', 'i')

/*
const filterItems = items => e => {
  const { value } = e.target
  const reg = regexify(value)
  console.log(
    items.filter(o => reg.test(o.user))
  )
}
*/
const last = x => x[x.length - 1]

const onKey = keyCode => cb => e =>
  (e.keyCode === keyCode)
    ? cb(e)
    : true

// filter.addEventListener('keydown', onKey(13)(filterItems(posts)), false)

const underlay = document.querySelector('#underlay')
const input = document.querySelector('#input')
const output = document.querySelector('#output')

const keys = Object.keys(posts[0])

const lookup = posts.reduce((acc, obj) => {
  keys.forEach(key => {
    if (!acc[key]) acc[key] = [];
    if (!acc[key].includes(obj[key])) acc[key].push(obj[key])
  });
  return acc
}, {});

const lastword = str => str.slice(str.lastIndexOf(' ') + 1);
const lastChar = str => str[str.length - 1]

console.log({ lookup })

const TAB = 9;


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


const omniboxTab = e => {

  if (e.keyCode !== TAB) return true
  e.preventDefault();

  const text = e.target.innerText;
  const last = text.split(/\s/).pop();
  const [ key, value ] = last.split(':');
  const regKey = new RegExp(`^${key}.*`);
  const regValue = new RegExp(`^${value}.*`);
  const [ match ] = keys.filter(x => regKey.test(x));

  if (key && match) {
    if (text === match) {
      underlay.innerText = text
      input.innerText = text
    }
    else {
      let suggestion = lookup[match].find(o => regValue.test(o));
      if (match && value && suggestion) {
        underlay.innerText = text.slice(0, text.lastIndexOf(':')) + ':' + suggestion
        input.innerText = text.slice(0, text.lastIndexOf(':')) + ':' + suggestion
      }
      else {
        underlay.innerText = text
        input.innerText = text
      }
    }
  }
  else {
    underlay.innerText = text
    input.innerText = text
  }
  placeCaretAtEnd(input)
};

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

const unary = fn => x => fn(x)
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
    return acc.filter(obj => obj[k] != null && values.find(x => reg(x).test(obj[k]))) 
  }, items)

  // get the latest search params
  const [ key, value ] = last(pairs)

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
    section('.post',
      div('.post__inner',
        div('.post__content',
          h3('.post__heading', obj.user),
          p('.post__copy' + '.' + obj.status, obj.comment || 'no comment')
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

const omniboxKeyup = e => {

  const text = e.target.innerText;
  const last = text.split(/\s/).pop();
  const [ key, value ] = last.split(':');
  const regKey = new RegExp(`^${key}.*`);
  const regValue = new RegExp(`^${value}.*`);
  const [ match ] = keys.filter(x => regKey.test(x));

  if (key && match) {
    if (text === match) {
      underlay.innerText = text
    }
    else {
      let suggestion = lookup[match].find(o => regValue.test(o));
      if (match && value && suggestion) {
        underlay.innerText = text.slice(0, text.lastIndexOf(':')) + ':' + suggestion
      }
      else {
        if (lastChar(text) === ':') {
          underlay.innerText = text.slice(0, text.length - key.length - 1) + match + ':'
        } else if (match && value && !suggestion) {
          underlay.innerText = text
        } else if (match && !suggestion) {
          underlay.innerText = text.slice(0, text.length - key.length) + match
        } else {
          underlay.innerText = text
        }
      }
    }
  }
  else {
    underlay.innerText = text
  }
};

input.addEventListener('keyup', filterOmnibox(filterItems(posts)), false);
input.addEventListener('keydown', onTab, false);
