// Exercise:
// Rerun 05-adding-a-collection.js before doing this exercise.
//
// In 05-adding-a-collection.js, '/image/20140721_144421b.jpg.json' was added
// to the 'phone' collection. Now remove it from that collection.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;

var imageURI = '/image/20140721_144421b.jpg.json';

db.documents.patch(
  {
    uri: imageURI,
    categories: ['metadata'],
    operations: [
      pb.collections.remove('phone')
    ]
  })
.result()
  .then(function(response) {

    return db.documents.read(
      {
        uris: [imageURI],
        categories: ['metadata']
      }
    ).result();
  })
  .then(function(metadata) {
    console.log('Document metadata: ' + JSON.stringify(metadata));
  })
  .catch(function(error) {
    console.log('Failed to delete document: ' + error);
  });
