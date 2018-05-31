function toEqualTest(values, callBack) {
  let count = 0;

  try {
    callBack();
  } catch (err) {
    console.log(err.message);
    count += 1;
  }

  return count;
}

function equalityCheck(tests, testType) {
  let Counter = 0;

  tests.forEach((testPair) => {
    const result = toEqualTest(testPair, () => {
      expect(testPair[0]).toEqual(testPair[1])
    });

    if (testType === 'pass') {
      if (result !== 0) { Counter += 1; }
    } else if (result === 0) {
      Counter += 1;
    }
  });

  return Counter;
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
    console.log(`%c Number of incorrectly passing tests = ${failingTestCounter}`, 'color: red')
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
    console.log(`%c Number of incorrectly failing tests = ${passingTestCounter}`, 'color: red');
  }
}

function testRunner() {
  failTests();
  passTests();
}
