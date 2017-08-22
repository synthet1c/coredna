const ENV = 'production'
const LEVEL = 2

const DEBUG = 3
const EVENT = 2
const AJAX = 2
const ROUTE = 2
const INFO = 1
const ERROR = 0

const border = color => [
  `border-left:3px solid ${color}`,
  `color:${color}`,
].join(';')

const bg = color => [
  `background-color:${color}`,
  `color:white`,
  `display:block`
].join(';')

const logger =
  ENV !== 'production'
    ? x => x => x
    :  (level, ...style) => (name, ...x) => {
        if (level <= LEVEL) {
          console.log(`%c ${name} `, style.join(';'), ...x)
        }
        return x[0]
      }

const log = logger(DEBUG, border('#3cf'))

log.blue = logger(DEBUG, border('#167ac6'))
log.green = logger(DEBUG, border('#689f39'))
log.red = logger(DEBUG, border('#e62117'))
log.purple = logger(DEBUG, border('#7a1fa2'))

log.BLUE = logger(DEBUG, bg('#167ac6'))
log.GREEN = logger(DEBUG, bg('#689f39'))
log.RED = logger(DEBUG, bg('#e62117'))
log.PURPLE = logger(DEBUG, bg('#7a1fa2'))

log.event = logger(EVENT, border('#689f39'))
log.route = logger(ROUTE, border('#689f39'))
log.ajax = logger(AJAX, border('#689f39'))

export default log
