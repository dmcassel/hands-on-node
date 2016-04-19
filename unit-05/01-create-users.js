// Create the users that will be used for this unit.

var fs = require('fs');
var bPromise = require('bluebird');
var request = bPromise.promisify(require('request'));

var conn = require('../config.js').admin;

function getAuth() {
  return {
    user: conn.user,
    password: conn.password,
    sendImmediately: false
  };
}

function createUser(user) {
  console.log('creating: ' + JSON.stringify(user['user-name']));
  return request({
      url: 'http://localhost:8002/manage/v2/users',
      method: 'POST',
      auth: getAuth(),
      headers: {
        'Content-type': 'application/json'
      },
      json: user
    });
}

bPromise.all([
  createUser(JSON.parse(fs.readFileSync('user-reader.json'))),
  createUser(JSON.parse(fs.readFileSync('user-writer.json'))),
  createUser(JSON.parse(fs.readFileSync('user-admin.json'))),
  createUser(JSON.parse(fs.readFileSync('user-nobody.json')))
]).then(function() {
  console.log('Users created.');
}).catch(function(error) {
  console.log('Something went wrong: ' + error);
});
