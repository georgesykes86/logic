var expect = function (value1) {
  return {
    toEqual: function (value2) {
      if (value1 !== value2) {
        throw new Error(`Test failed: expected ${value1} to equal ${value2}`)
      }
    }
  }
}

function it (description, callBack) {
  try {
    callBack()
    console.log(`%c${description}`, 'color: green')
  }
  catch(err) {
    console.log(`%c${description}`, 'color: red')
    console.log(`%c${err.message}`, 'color: red')
  }
}
