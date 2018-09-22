var expect  = require('expect');
var {generateMessage} = require('./message.js');

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
