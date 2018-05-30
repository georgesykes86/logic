function describe (description, callback) {
  try {
    console.log(`%c${description}`, 'text-decoration: underline')
    callback()
  }
  catch(err) {
    console.log(err)
  }
}

var expect = function (value1) {
  return {
    toEqual: function (value2) {
      if (value1 !== value2) {
        throw new Error(`Test failed: expected ${value1} to equal ${value2}`)
      }
    }
  }
}

var oldLog = console.log

var console = window.console,
    _log = console ? console.log : function () {};

_log.history = [];

console.log = function () {
  _log.history.push.apply(_log.history, arguments);
  _log.apply(console, arguments);
}

describe('no error', function () {
  return
})

describe('test description', function() {
  throw new Error('I AM AN ERROR')
})

expect(_log.history[0]).toEqual('%cno error')

expect(_log.history[1]).toEqual('text-decoration: underline')

expect(_log.history[2]).toEqual('%ctest description')

expect(_log.history[3]).toEqual('text-decoration: underline')

expect(_log.history[4].toString()).toEqual('Error: I AM AN ERROR')
