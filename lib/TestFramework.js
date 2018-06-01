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

  let tests = [];
  let assertions = [];

  function printTests() {
    tests.forEach((test) => {
      console.log(test.description)
      test.assertions.forEach((assertion) => {
        if (assertion.status === 'pass') {
          const format = 'color: green';
          console.log(`  %c${assertion.description}`, format);
        } else {
          const format = 'color: red';
          console.log(`  %c${assertion.description}`, format);
          console.log(`    %c${assertion.error.stack}`, format);
        }
      });
    });
  }

  exports.it = function (description, callBack, AssertClass = Assertion, assertionStore = assertions) {
    try {
      callBack();
      assertionStore.push(new AssertClass(description, 'pass'));
    } catch (err) {
      assertionStore.push(new AssertClass(description, 'fail', err));
    }
  };

  exports.describe = function (description, callback, AssertionClass = AssertionGroup, testSuite = tests ) {
    callback();
    const assertionGroup = new AssertionClass(description, assertions);
    assertions = [];
    testSuite.push(assertionGroup);
    return assertionGroup;
  };

  exports.Logic = function(callback) {
    callback();
    printTests();
    return tests = [];
  }
}(this));
