import {describe, it} from 'jasmine'
import Coredna from './js/coredna/classes/Coredna'
import decorator from './js/coredna/decorators/decorator'

describe('#decorator', function() {

  const add = x => y => x + y

  class Test extends Coredna {
    constructor() {
      super()
    }
    @decorator(add(1))
    method(x) {
      assert(x).toBe(4)
    }
  }

  it ('should decorate a class method', function(done) {

    const test = new Test

    test.method(2)

  })

})
