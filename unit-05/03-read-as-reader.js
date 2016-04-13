// Read a document from the database.
//
// hon-reader has the 'rest-reader' role, which does have permission to read
// the document. Why? Because when a document is inserted through the REST API,
// rest-reader is given 'read' and rest-writer is given 'update'.

var ml = require('marklogic');
var reader = require('../config.js').reader;
var db = ml.createDatabaseClient(reader);

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
