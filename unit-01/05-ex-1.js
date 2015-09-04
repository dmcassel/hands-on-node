var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);

// Task: Print the city where image 03.JPG was taken.
//       Use the Promise method.
// URI: /image/03.JPG.json
// JSON path within document: location.city

// document URI in the database
var imgURI = '/image/03.JPG.json';

db.documents.read(imgURI).result()
  .then(function(docs) {
    // write out the document
    console.log(docs[0].content.location.city);
  })
  .catch(function(error) {
    console.log(error);
  });
