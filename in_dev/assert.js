(function(exports){
  exports.expect = function (value1) {
    function typeMatch(value1, value2){

  typeValue1 = Object.prototype.toString.call(value1);

  if (Object.prototype.toString.call(value2)!= typeValue1){
    throwError(value1, value2)
  };

}
    
    function lengthMatch(value1, value2){

  if (Object.keys(value1).length !== Object.keys(value2).length){
    throwError(value1, value2)
  }

}
    
    function valueMatch(value1, value2){

  if (typeValue1 === '[object Array]' || typeValue1 === '[object Object]') {
    if (JSON.stringify(value1) !== JSON.stringify(value2)) {
      throwError(value1, value2)
    }
  } else {
    if (value1 !== value2) {
      throwError(value1, value2)
    }
  };

}
    
    function throwError(value1, value2){
  throw new Error(`Test failed: expected ${value1} to equal ${value2}`)
}
    
    return {
      toEqual: function (value2) {
        typeMatch(value1, value2)
        lengthMatch(value1, value2)
        valueMatch(value1, value2)
      }
    }
  }

  exports.it = function(description, callBack) {
    try {
      callBack()
      console.log(`%c${description}`, 'color: green')
    }
    catch(err) {
      console.log(`%c${description}`, 'color: red')
      console.log(`%c${err.stack}`, 'color: red')
    }
  }

  exports.describe = function(description, callback){
    try {
      console.log(`%c${description}`, 'text-decoration: underline')
      callback()
    }
    catch(err) {
      console.log(err)
    }
  }
}(this));
