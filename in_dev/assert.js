(function (exports) {
  exports.expect = function (value1) {
    function throwError(valueOne, valueTwo) {
      throw new Error(`Test failed: expected ${valueOne} to equal ${valueTwo}`);
    }

    function valueType(valueOne) {
      return Object.prototype.toString.call(valueOne);
    }

    function typeMatch(valueOne, valueTwo) {
      const typeValue1 = valueType(valueOne);
      const typeValue2 = valueType(valueTwo);

      if (typeValue1 !== typeValue2) {
        throwError(valueOne, valueTwo);
      }
    }

    function lengthMatch(valueOne, valueTwo) {
      if (Object.keys(valueOne).length !== Object.keys(valueTwo).length) {
        throwError(valueOne, valueTwo);
      }
    }

    function valueMatch(valueOne, valueTwo) {
      const typeValue1 = valueType(valueOne);

      if (typeValue1 === '[object Array]' || typeValue1 === '[object Object]') {
        if (JSON.stringify(valueOne) !== JSON.stringify(valueTwo)) {
          throwError(valueOne, valueTwo);
        }
      } else if (valueOne !== valueTwo) {
        throwError(valueOne, valueTwo);
      }
    }

    return {
      toEqual(value2) {
        typeMatch(value1, value2);
        lengthMatch(value1, value2);
        valueMatch(value1, value2);
      },
    };
  };

  exports.it = function (description, callBack) {
    try {
      callBack();
      console.log(`%c${description}`, 'color: green');
    } catch (err) {
      console.log(`%c${description}`, 'color: red');
      console.log(`%c${err.stack}`, 'color: red');
    }
  };

  exports.describe = function (description, callback) {
    try {
      console.log(`%c${description}`, 'text-decoration: underline');
      callback();
    } catch (err) {
      console.log(err);
    }
  };
}(this));
