// Read a document from the database. Apply the add-image-size tranform during
// the document read. This will supplement the document contents with
// additional data.
// Handle the response using the Promise approach.

var ml = require('marklogic');
var conn = require('../config.js').reader;
var db = ml.createDatabaseClient(conn);

// document URI in the database
var imgURI = '/image/01.JPG.json';

db.documents.read({ uris: imgURI, transform: 'add-image-size'}).result()
  .then(function(docs) {
    // write out the document
    console.log(docs);
  })
  .catch(function(error) {
    console.log(error);
  });
