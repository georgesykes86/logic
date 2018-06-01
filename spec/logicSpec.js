let callBackCalls = 0;
const callback = function () { callBackCalls += 1; };

result = Logic(callback);

expect(callBackCalls).toEqual(1);

expect(result).toEqual([]);
