var expect  = require('expect');
var {generateMessage} = require('./message.js');
var {generateLocationMessage} = require('./message.js');

describe('generateMessage',()=>{
it('should generate message object',()=>{
  let text='sample text';
  let from='abhishek';
  let message = generateMessage(from,text);
  expect(message.text).toBe(text)
  expect(message.from).toBe(from)
  expect(message.createdAt).toBeA('number');
  expect(message).toInclude({from,text});
})
});

describe('generateLocationMessage',()=>{
  it('should generate correct location object',()=>{
    let lat = 1;
    let long = 1;
    let result = generateLocationMessage('Deepak',1,1);
    expect(result.from).toBe('Deepak')
    expect(result.url).toBe(`https://www.google.com/maps?q=${1},${1}`)
  })
})
