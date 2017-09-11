const posts = [
  { id: 111, user: 'andrew', status: 'done' },
  { id: 112, user: 'sharjeel', status: 'done' },
  { id: 113, user: 'john', status: 'pending' },
  { id: 114, user: 'sharjeel', status: 'done' },
  { id: 115, user: 'andrew', status: 'done' },
]


const filter = document.querySelector('#filter')

const regexify = x =>
  new RegExp('.*' + x.split('').join('.*') + '.*', 'i')

const filterItems = items => e => {
  const { value } = e.target
  const reg = regexify(value)
  console.log(
    items.filter(o => reg.test(o.user))
  )
}

const onKey = keyCode => cb => e =>
  (e.keyCode === keyCode)
    ? cb(e)
    : true

filter.addEventListener('keydown', onKey(13)(filterItems(posts)), false)

const underlay = document.querySelector('#underlay')
const input = document.querySelector('#input')

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


const omniboxKeyup = e => {

  const text = e.target.innerText;
  const last = text.split(/\s*,*\s+/).pop();
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
        } else {
          underlay.innerText = text.slice(0, text.length - key.length) + match
        }
      }
    }
  }
  else {
    underlay.innerText = text
  }
};

input.addEventListener('keyup', omniboxKeyup, false);
