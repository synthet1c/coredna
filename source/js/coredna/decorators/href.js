import cond from './cond'

const href = cond(x =>
  (window.location.href.match(x) || [])
    .slice(1)
)

export default href
