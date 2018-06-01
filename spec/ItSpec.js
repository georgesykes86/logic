(function () {

  const description = 'Description';
  const err = new Error('Fake error');
  const AssertClass = function(description, status, error) {
    this.description = description
    this.status = status;
    if (error) {
      this.error = error;
    }
  };


  function run(tests) {
    let failingTests = 0;
    tests.forEach((test) => {
      try {
        test();
      } catch (error) {
        failingTests += 1;
      }
    });
    return failingTests;
  }

  function runPassingTests() {
    let assertions = [];
    const callback = function () { };
    it(description, callback, AssertClass, assertions);

    const tests = [
      function () { expect(assertions[0].description).toEqual(description); },
      function () { expect(assertions[0].status).toEqual('pass'); },
    ];
    return run(tests);
  }

  function runFailingTests() {
    let assertions = [];
    const callback = function () { throw err; };
    it(description, callback, AssertClass, assertions);

    const tests = [
      function () { expect(assertions[0].description).toEqual(description); },
      function () { expect(assertions[0].status).toEqual('fail'); },
      function () { expect(assertions[0].error).toEqual(err); },
    ];
    return run(tests);
  }

  function runTests() {
    const totalFailing = runPassingTests() + runFailingTests();

    if (totalFailing > 0) {
      console.log(`%c${totalFailing} failed`, 'color: red');
    } else {
      console.log('%cAll tests passed', 'color: green');
    }
  }

  runTests();
}());
