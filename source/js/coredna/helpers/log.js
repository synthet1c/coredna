const styled = color => [
  `border-left:3px solid ${color}`,
  `color:${color}`,
].join(';')

const logger =
  color => (name, ...x) =>
    (console.log(`%c ${name} `, styled(color), ...x), x[0])

const log = logger('#3cf')

log.blue = logger('#167ac6')
log.green = logger('#689f39')
log.red = logger('#e62117')
log.purple = logger('#7a1fa2')

export default log
