var expect = function (value1) {
  return {
    toEqual: function (value2) {

      // checking types

      typeValue1 = Object.prototype.toString.call(value1);

      if (Object.prototype.toString.call(value2)!= typeValue1){
        throwError(value1, value2)
      };

      // check length

      if (Object.keys(value1).length !== Object.keys(value2).length){
        throwError(value1, value2)
      }

      function throwError(value1, value2){
        throw new Error(`Test failed: expected ${value1} to equal ${value2}`)
      }

      //

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
