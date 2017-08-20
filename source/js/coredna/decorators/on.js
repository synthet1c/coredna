import * as pubsub from '../pubsub'

const on = event => (target, key, descriptor) => {
  pubsub.on(event, function(e, ...data) {
    descriptor.value.apply(this, data)
  })
  return descriptor
}

export default on
