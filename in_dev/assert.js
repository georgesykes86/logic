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
    throw err
  }
}

function describe (description, callback){
  try {
    console.log(`%c${description}`, 'color: blue')
    callback()
  }
  catch(err) {
    console.log(`%c${description}`, 'color: red')
    console.log(`%c${err.message}`, 'color: red')
    console.log(`%c${err.stack}`, 'color: red')
    return
  }
}

// export { expect, it };
