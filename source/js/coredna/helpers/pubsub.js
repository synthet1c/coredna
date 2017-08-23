import log from './log'

let EVENTS = {}
window.EVENTS = EVENTS
export const on = (name, cb) => {
  if (!EVENTS[name]) {
    EVENTS[name] = {
      name,
      cbs: []
    }
  }
  log.event('pubsub:subscribe', name)
  EVENTS[name].cbs.push(cb)
}

export const emit = (name, self, args) =>
  Object.keys(EVENTS)
    .filter(event =>
      (name instanceof RegExp)
        ? name.test(event)
        : name === event
    )
    .forEach(event => {
      log.event('pubsub:emit', event)
      EVENTS[event].cbs.forEach(
        cb => cb.apply(self || this, args)
      )
    })

export const off = name => {
  EVENTS = Object.keys(EVENTS)
    .filter(event =>
      (name instanceof RegExp)
        ? !name.test(event)
        : name !== event
    )
    .reduce((acc, x) =>
      (acc[x] = EVENTS[x], acc)
    , {})
}

export default {
  on,
  emit,
  off
}
