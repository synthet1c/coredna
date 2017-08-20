const Symbol = Symbol || (x => `Symbol(${x})`)

export const emitters = Symbol('emitters')
export const events = Symbol('events')
export const routes = Symbol('routes')

export default {
  emitters,
  events,
  routes,
}
