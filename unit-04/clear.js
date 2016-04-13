// Clear out the database.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);

db.documents.removeAll({collection: 'binary'}).result()
  .then(function(){
    return db.documents.removeAll({collection: 'image'}).result();
  })
  .then(function(response) {
    console.log('Documents removed.');
  })
  .catch(function(error) {
    console.log('Failed to delete document: ' + error);
  });
