function expect(object) {
  return {
    toHaveContent(value) {
      if (object.innerHTML.includes(value)) {
        console.log('%c You has logic!', 'color: green')
      } else {
        console.log('%c You has NO logic!', 'color: red')
      }
    }
  };
};
