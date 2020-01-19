
describe('JSON Test', function(){
  test('stringify(undefined) undefined', () => {
    expect(JSON.stringify(undefined)).toBeUndefined();
  }); 

  test('stringify(Symbol)    undefined', () => {
    expect(JSON.stringify(Symbol('test'))).toBeUndefined();
  });

  test('stringify(function)  undefined', () => {
    expect(JSON.stringify(function(){})).toBeUndefined(); 
  });

});