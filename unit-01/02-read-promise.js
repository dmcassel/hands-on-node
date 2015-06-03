// Read a document from the database.
// Handle the response using the Promise approach.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);

// document URI in the database
var imgURI = '/image/01.JPG.json';

db.documents.read(imgURI).result()
  .then(function(docs) {
    // write out the document
    console.log(docs[0]);
  })
  .catch(function(error) {
    console.log(error);
  });
