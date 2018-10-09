const expect = require('expect')
const {User} = require('./users');

describe('Users',()=>{

beforeEach(()=>{
  users = new User();
  users.users = [{id:1,name:'DC',room:'nodejs'},{id:2,name:'panny',room:'nodejs'},{id:3,name:'abhishek',room:'BDE'}]
});


it('should add a new user',()=>{

  var myUser = {
    name:"Deepak",
    id:13,
    room:"NodeJs"
  };

  var user = new User();

  user.addUser(myUser.id,myUser.name,myUser.room);

  expect(user.users).toEqual([myUser]);

});

it('should return names for node course',()=>{
  var getUser = users.getUserList('nodejs');
  expect(getUser).toEqual(['DC','panny'])
})

it('should remove user from array',()=>{
  var userId = 1;
  var user = users.removeUser(userId);
  expect(user[0].id).toBe(userId);

  expect(users.users.length).toBe(2);
})

it('should not remove user from array',()=>{
  var userId = 10;
  var user = users.removeUser(userId);

  expect(user[0]).toNotExist();
  expect(users.users.length).toBe(3);
})

it('should find user',()=>{
  var searchedUser = users.getUser(1);
  expect(searchedUser[0]).toEqual(users.users[0]);
})

it('should not find user',()=>{
  var searchedUser = users.getUser(5);
  expect(searchedUser[0]).toNotEqual(users.users[0]);
})


});
