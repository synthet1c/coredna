import log from './helpers/log'
import { compose, curry, map, add } from 'ramda'
import IO from 'crocks/IO'

import { section, h3, p, span } from './helpers/html'

const input = (name, expected) => new IO(() => {
  const element = document.querySelector(`[name=${name}]`)
  return {
    name,
    element,
    valid: element.value === expected
  }
})

const trace = name => x => log.BLUE(name, x)

IO.of(5)
  .map(add(16))
  .map(trace('io'))
  .run()


const validator = one => two => [ one, two ]

const inputToHtml = input =>
  section(`.input${input.valid ? '.valid' : '.invalid'}`,
    h3('.input__heading', input.name),
  )

const ioValid = IO.of(validator)
  .ap(input('one', 'one'))
  .ap(input('two', 'three'))
  .map(trace('ioValid'))
  .map(map(inputToHtml))
  .map(trace('html'))
  .run()
