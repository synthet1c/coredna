const Symbol = Symbol || (x => `Symbol(${x})`)

export const emitters = Symbol('emitters')
export const events = Symbol('events')
export const routes = Symbol('routes')
export const initEvents = Symbol('initEvents')
export const initRoutes = Symbol('initRoutes')

export default {
  emitters,
  events,
  routes,
  initEvents,
  initRoutes,
}
