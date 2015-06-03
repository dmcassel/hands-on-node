// Read a document from the database.
// Handle the response using the Object Stream approach.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);

// document URIs in the database
var imgURIs =
  ['/image/01.JPG.json',
   '/image/02.JPG.json'];

db.documents.read(imgURIs).stream()
  .on('data', function(document) {
    // process one document
    console.log('I got ' + document.content.filename);
  }).on('end', function() {
    // all data received
    console.log('All done.');
  }).on('error', function(error) {
    // handle errors
    console.log('Something went wrong: ' + error);
  });
