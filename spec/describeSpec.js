const description = 'test description'
let assertions = ['example assertion'];
let callbackCalls = 0;

function callback() {
  callbackCalls += 1;
}

describe(description, callback);

expect(callbackCalls).toEqual(1);
