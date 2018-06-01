function equalityCheck(tests, testType) {
  let failCount = 0;

  tests.forEach((testPair) => {
    try {
      expect(testPair[0]).toEqual(testPair[1])
      failCount += testType === 'pass' ? 0 : 1;
    } catch (err) {
      failCount += testType === 'fail' ? 0 : 1;
    }
  });

  return failCount;
}

function failTests() {
  const tests = [
    [1, 'a'],
    [[1, 2], { 1: 3, 2: 4 }],
    [[1, { 1: 3 }], [1, 2]],
    [{ 2: 3, 4: 3 }, { 1: 5, 2: 3 }],
    [true, false],
    [1, 2],
    [true, 4],
    ['a', 'b'],
    [[1, 2], [2, 1]],
    [null, 0],
    ['0', 0],
    [5, undefined],
    [null, undefined],
  ];

  const testType = 'fail';
  const failingTestCounter = equalityCheck(tests, testType);

  if (failingTestCounter !== 0) {
    console.log(`%cNumber of incorrectly passing tests = ${failingTestCounter}`, 'color: red');
  } else {
    console.log('%cAll expected failing tests failing', 'color: green');
  }
}

function passTests() {
  const tests = [
    [1, 1],
    ['a', 'a'],
    [[1, 2], [1, 2]],
    [[1, 2], [1, 2]],
    [{ 1: 2, 3: 4 }, { 1: 2, 3: 4 }],
    [true, true],
    [1 + 2, 3],
  ];

  const testType = 'pass';
  const passingTestCounter = equalityCheck(tests, testType);

  if (passingTestCounter !== 0) {
    console.log(`%cNumber of incorrectly failing tests = ${passingTestCounter}`, 'color: red');
  } else {
    console.log('%cAll expected passing tests passing', 'color: green');
  }
}

function testRunner() {
  failTests();
  passTests();
}
