import * as pubsub from '../helpers/pubsub'
import Symbols from '../helpers/symbols'

const after = type => (target, key, descriptor) => {
  return {
    ...descriptor,
    value: function(...args) {
      pubsub.emit(
        `${this.constructor.name}.${type}`,
        this,
        [descriptor.value.apply(this, args)]
      )
    }
  }
}

export default after
