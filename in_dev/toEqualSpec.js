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
    [{1: 3, 2: 3}, {1: 3, 2: 3}],
  ]

  var failingTestCounter = 0

  tests.forEach(function(testPair) {
    var result = toEqualTest(testPair, function() {
      expect(testPair[0]).toEqual(testPair[1])
    });
    failingTestCounter += result
  });

  if (failingTestCounter !== 0){
      console.log(`%c Number of correct failing tests = ${failingTestCounter}`, 'color: red')
  }

}

function passTests(){

  var tests = [
    [1, 1],
    ["a", "a"],
    [[1, 2], [1, 2]],
    [{1: 2, 1: 2}, {1: 2, 1: 2}]
  ]

  var passingTestCounter = 0

  tests.forEach(function(testPair) {
    var result = toEqualTest(testPair, function() {
      expect(testPair[0]).toEqual(testPair[1])
    });
    if (result === 0) { passingTestCounter +=1 }

  });

  if (passingTestCounter !== 0){
      console.log(`%c Number of correct passing tests = ${passingTestCounter}`, 'color: green')
  }

}
