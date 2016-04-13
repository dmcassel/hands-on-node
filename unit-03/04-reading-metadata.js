// This example shows how the Node API presents document Metadata.
//
// Rerun 01-write-document.js if you have run 03-delete-document

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);

db.documents.read(
  {
    uris: ['/image/20140721_144421b.jpg.json'],
    categories: ['metadata']
  }
).result()
  .then(function(response) {
    console.log('Document metadata: ' + JSON.stringify(response));
  })
  .catch(function(error) {
    console.log('Failed to retrieve document: ' + error);
  });

// Result:
// [
//   {
//     "collections":["image"],
//     "permissions":[
//       {"role-name":"rest-writer","capabilities":["update"]},
//       {"role-name":"rest-reader","capabilities":["read"]}
//     ],
//     "quality":0,
//     "properties":{},
//     "uri":"/image/20140721_144421b.jpg.json",
//     "category":["metadata"],
//     "format":"json",
//     "contentType":"application/json"
//   }
// ]
