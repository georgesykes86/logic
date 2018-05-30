(function(){

  var old_log = console.log
  var description = "Description"
  var err = new Error("Fake error")
  var result = []
  var results = []
  console.log = function(arg1, arg2){ result.push([arg1, arg2]) }

  function run(tests){
    var failingTests = 0
    tests.forEach(function(test){
      try{
        test();
        results.push("Pass")
      }
      catch(err){
        failingTests++;
        results.push("fail")
      }
    });
    result = [];
    return failingTests
  }

  runPassingTests = function(){
    var callback = function(){ return }
    it(description, callback)

    var tests = [
      function(){ expect(result[0][0]).toEqual(`%c${description}`) },
      function(){ expect(result[0][1]).toEqual('color: green') }
    ]
    return run(tests)
  }

  runFailingTests = function(){
    var callback = function(){ throw err }
    it(description, callback)

    var tests = [
      function(){ expect(result[0][0]).toEqual(`%c${description}`) },
      function(){ expect(result[0][1]).toEqual('color: red') },
      function(){ expect(result[1][0]).toEqual(`%c${err.stack}`) },
      function(){ expect(result[1][1]).toEqual('color: red') }
    ]
    return run(tests)
  }

  runTests = async function(){

    var failingPass = await runPassingTests()
    var failingFail = await runFailingTests()

    var totalFailing = failingPass + failingFail

    console.log = old_log
    if(totalFailing > 0){
      console.log(`%c${totalFailing} failed`, 'color: red')
    }
    else{
      console.log("%cAll tests passed", 'color: green' )
    }
    results.forEach(function(result){
      format = result === 'Pass'? 'color: green' : 'color: red'
      console.log(`%c${result}`, format)
    });

  }

  runTests()

}());
