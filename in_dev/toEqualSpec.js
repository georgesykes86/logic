function toEqualTest(values, callBack) {
  var count = 0

  try  {
    callBack()
  }

  catch(err) {
    console.log(err.message)
    count += 1
  }

  return count
}

function testRunner() {

  failTests()
  passTests()

}

function failTests(){

  var tests = [
    [1, "a"],
    [[1,2], {1: 3, 2: 4}],
    [[1, {1: 3}], [1, 2]],
    [{2: 3, 4: 3}, {1: 5, 2: 3}],
    [true, false],
    [1,2],
    [true, 4],
    ['a', 'b'],
    [[1,2], [2,1]],
    [null, 0],
    ['0', 0],
    [5, undefined],
    [null, undefined]
  ]

  var testType = "fail"
  var failingTestCounter = equalityCheck(tests, testType);

  if (failingTestCounter !== 0){
    console.log(`%c Number of incorrectly passing tests = ${failingTestCounter}`, 'color: red')
  }

}

function passTests(){

  var tests = [
    [1, 1],
    ["a", "a"],
    [[1, 2], [1, 2]],
    [[1, 2], [1,2]],
    [{1: 2, 1: 2}, {1: 2, 1: 2}],
    [true, true],
    [1+2, 3]
  ]

  var testType = "pass"
  var passingTestCounter = equalityCheck(tests, testType);

  if (passingTestCounter !== 0){
      console.log(`%c Number of incorrectly failing tests = ${passingTestCounter}`, 'color: red')
  }

}

function equalityCheck(tests, testType){

  var Counter = 0

  tests.forEach(function(testPair) {
    var result = toEqualTest(testPair, function() {
      expect(testPair[0]).toEqual(testPair[1])
    });

    if (testType == "pass"){
      if (result !== 0) { Counter += 1 }
    }  else {
      if (result === 0) { Counter += 1 }
    }


  })

  return Counter

}
