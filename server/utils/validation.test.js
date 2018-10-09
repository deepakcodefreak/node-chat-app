const expect = require('expect');
const {isRealString} = require('./validation');

describe('#isRealString test case',()=>{
  it('should validate if the string is real or not',()=>{
    let myString = '   Deepak Chawla';
    let mySecondString = '  ';
    let resultTwo = isRealString(mySecondString);
    let result = isRealString(myString);
    expect(result).toBe(true);
    expect(resultTwo).toBe(false);
  })
})
