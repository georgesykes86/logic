function toEqualTest(values, callBack) {
  var count = 0

  try  {
    callBack()
  }

  catch(err) {
    count += 1
  }

  return count
}

function testRunner() {
  var tests = [
    [1, 1],
    [2, 2],
    ["a", "a"],
    [1, 2]
  ]

  var failingTestCounter = 0

  tests.forEach(function(test) {
    var test = toEqualTest(values, function() {
      expect(values[0]).toEqual(values[1])
    });
    failingTestCounter += test
  });

  console.log(`Number of failing tests = ${failingTestCounter}`)
}
