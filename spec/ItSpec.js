(function () {

  const description = 'Description';
  const err = new Error('Fake error');

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
    const callback = function () { };
    const expectObject = it(description, callback);

    const tests = [
      function () { expect(expectObject.description).toEqual(description); },
      function () { expect(expectObject.status).toEqual('pass'); },
    ];
    return run(tests);
  }

  function runFailingTests() {
    const callback = function () { throw err; };
    const expectObject = it(description, callback);

    const tests = [
      function () { expect(expectObject.description).toEqual(description); },
      function () { expect(expectObject.status).toEqual('fail'); },
      function () { expect(expectObject.error).toEqual(err); },
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
