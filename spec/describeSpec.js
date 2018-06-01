const description = 'test description'
let assertions = [];
let callbackCalls = 0;

let tests = [];

function callback() {
  callbackCalls += 1;
}

function AssertionGroup(description, assertions){
  this.name = "fakegroup"

}


const result = describe(description, callback, AssertionGroup, tests);

expect(callbackCalls).toEqual(1);
expect(tests[0]).toEqual(new AssertionGroup(description, assertions))
expect(tests.length).toEqual(1)
expect(result).toEqual(tests[0])
