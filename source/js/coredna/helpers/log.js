const ENV = 'production'

class Level {
  constructor(x) {
    this.val = x
  }
}

const DEBUG = new Level(3)
const EVENT = new Level(2)
const AJAX = new Level(2)
const ROUTE = new Level(2)
const INFO = new Level(1)
const ERROR = new Level(0)
const ALL = new Level(Infinity)

let LEVELS = new Set([])

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
        if (LEVELS.has(level)) {
          console.log(`%c ${name} `, style.join(';'), ...x)
        }
        return x[0]
      }

const log = logger(DEBUG, bg('#3cf'))

const lightblue = '#03a9f4'
const blue = '#167ac6'
const green = '#689f39'
const red = '#e62117'
const purple = '#7a1fa2'

log.blue = logger(DEBUG, border(blue))
log.green = logger(DEBUG, border(green))
log.red = logger(DEBUG, border(red))
log.purple = logger(DEBUG, border(purple))

log.BLUE = logger(DEBUG, bg(blue))
log.GREEN = logger(DEBUG, bg(green))
log.RED = logger(DEBUG, bg(red))
log.PURPLE = logger(DEBUG, bg(purple))

log.event = logger(EVENT, bg(lightblue))
log.route = logger(ROUTE, bg(purple))
log.ajax = logger(AJAX, bg(purple))

const levels = {
  ajax: AJAX,
  event: EVENT,
  route: ROUTE,
  info: INFO,
  debug: DEBUG,
}

log.AJAX = AJAX
log.ROUTE = ROUTE
log.EVENT = EVENT
log.DEBUG = DEBUG
log.ALL = ALL

log.set = function(level) {
  if (level instanceof Level) {
    if (level === ALL) {
      LEVELS = new Set([AJAX, ROUTE, EVENT, DEBUG, INFO])
    } else {
      LEVELS.add(level)
    }
  }
}

log.remove = function(level) {
  if (level instanceof Level) {
    if (level === ALL) {
      LEVELS = new Set([])
    } else {
      LEVELS.delete(level)
    }
  }
}

export default log
