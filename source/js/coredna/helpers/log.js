const ENV = 'production'

class Level {
  constructor(x, name) {
    Object.defineProperties(this, {
      val: { writable: false, value: x },
      name: { value: name }
    })
  }
}

const DEBUG = new Level(3, 'debug')
const EVENT = new Level(2, 'event')
const AJAX = new Level(2, 'ajax')
const ROUTE = new Level(2, 'route')
const INFO = new Level(1, 'info')
const ERROR = new Level(0, 'error')
const ALL = new Level(Infinity, 'all')

let LEVELS = new Set([AJAX, ROUTE, DEBUG, INFO, ERROR])

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

window.log = log

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
      LEVELS = new Set([ROUTE, EVENT, DEBUG, INFO])
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

log.only = function(level) {
  if (level instanceof Level) {
    LEVELS = new Set([level])
  }
}

log.not = function(level) {
  LEVELS = new Set([AJAX, ROUTE, EVENT, DEBUG, INFO].filter(x => x !== level))
}

log.none = () => log.remove(ALL)
log.all = () => log.set(ALL)


const b = color => [
  `border: 1px solid ${color}`,
  `color:${color}`,
  `padding:.5em`,
  `font-size:1.5em`,
  `line-height:2`,
].join(';')

const B = color => [
  `border: 1px solid ${color}`,
  `background:${color}`,
  `color:white`,
  `padding:.5em`,
  `font-size:1.5em`,
  `line-height:2`,
].join(';')


let count = 0
const colors = [
  [B(blue), b(purple), b(green)],
  [b(blue), B(purple), b(green)],
  [b(blue), b(purple), B(green)]
]

const H = [
  `color:${blue}`,
  `font-size:2em`,
  `line-height:2em`,
  `text-shadow:0 0 10px 10px ${blue}`,
  `font-weight:700`
].join(';')

let dots = 0
let timer = null
function render() {
  console.clear
  dots = (dots + 1) % 4
  console.clear()
  console.log('%c hi, want to know more about this website?' + Array(dots).fill('.').join(''), H)
  timer = setTimeout(render, 400)
}
// render()


console.log('%c home %c contact %c about ', ...colors[count])

Object.defineProperties(window, {
  next: {
    get: function() {
      console.clear()
      count = (count + 1) % 3
      console.log('%c home %c contact %c about ', ...colors[count])
    }
  },
  prev: {
    get: function() {
      console.clear()
      count = (count - 1)
      if (count < 0) count = 2
      console.log('%c home %c contact %c about ', ...colors[count])
    }
  },
  activate: {
    value() {
      window.addEventListener('keydown', function(e) {
        if (e.which === 37 || e.which === 39 || e.which === 9) {
          e.preventDefault()
          e.stopPropagation()
          switch (e.which) {
            case 37:
              if (e.shiftKey) {
                window.next
              } else {
                window.prev
              }
              break
            case 9:
            case 39:
              if (e.shiftKey) {
                window.prev
              } else {
                window.next
              }
              break
          }
        }
      }, false)
    }
  }
})

export default log
