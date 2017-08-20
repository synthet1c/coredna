const Symbol = Symbol || (x => `Symbol(${x})`)

export const emitters = Symbol('emitters')
export const events = Symbol('events')

export default {
  emitters,
  events,
}
