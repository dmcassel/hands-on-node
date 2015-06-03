// Read a document from the database.
// Handle the response using the Chunked Stream approach.
// This method is particularly useful when dealing with binary data, though
// not the only way to do so.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);

// document URI in the database
var imgURI = '/binary/01.JPG';

var fs = require('fs');
var ostrm = fs.createWriteStream('01.jpg');


db.documents.read(imgURI).stream('chunked')
  .pipe(ostrm)
  .on('error', function(error) {
    // handle errors
    console.log('Something went wrong: ' + error);
  });
