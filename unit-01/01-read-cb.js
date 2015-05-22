// Read a document from the database.
// Handle the response using the Callback approach.

var ml = require('marklogic');
var conn = require('./config.js').connection;
var db = ml.createDatabaseClient(conn);

// document URI in the database
var imgURI = '/image/01.JPG.json';

db.documents.read(imgURI).result(
  function(docs) {
    // write out the document
    console.log(docs[0]);
  },
  function(error) {
    console.log(error);
  }
);
