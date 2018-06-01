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

  function Assertion(description, status, error) {
    this.description = description;
    this.status = status;
    if (error) {
      this.error = error;
    }
  }

  function AssertionGroup(description, assertions) {
    this.description = description;
    this.assertions = assertions;
  }

  let assertions = [];

  exports.it = function (description, callBack) {
    try {
      callBack();
      assertions.push(new Assertion(description, 'pass'));
    } catch (err) {
      assertions.push(new Assertion(description, 'fail', err));
    }
  };

  exports.describe = function (description, callback) {
    callback();
    const assertionGroup = new AssertionGroup(description, assertions);
    assertions = [];
    return assertionGroup;
  };
}(this));
