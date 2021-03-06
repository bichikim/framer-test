import {callbackify} from '@/utils'

describe('callbackify', function test() {
  it('should call a callback function', function test(done) {
    const callback = (error, data) => {
      expect(error).toBe(null)
      expect(data).toBe('foo')
      done()
    }
    callbackify(() => Promise.resolve('foo'), callback)
  })

  it('should call a callback function with an error', function test(done) {
    const callback = (error, data) => {
      expect(error).toBe('foo')
      expect(data).toBe(null)
      done()
    }
    callbackify(() => Promise.reject('foo'), callback)
  })

  it('should call a callback with none promise', function test(done) {
    const callback = (error, data) => {
      expect(error).toBe(null)
      expect(data).toBe('foo')
      done()
    }
    callbackify(() => 'foo', callback)
  })

  it('should call a callback with none promise', function test(done) {
    const callback = (error, data) => {
      expect(error).toEqual(new Error('foo'))
      expect(data).toBe(null)
      done()
    }
    callbackify(() => {
      throw new Error('foo')
    }, callback)
  })
})
