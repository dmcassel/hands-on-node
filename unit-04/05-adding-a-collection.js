// Add a document to a collection

// You can also remove a document from a collection or update other metadata.
// Updating metadata is like updating a document's content, but we use the
// 'metadata' category. See 04-reading-metadata.js for an example of what this
// looks like.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;

db.documents.patch(
  {
    uri: '/image/20140721_144421b.jpg.json',
    categories: ['metadata'],
    operations: [
      pb.insert('/array-node("collections")', 'last-child', 'phone')
    ]
  })
.result()
  .then(function(response) {

    return db.documents.read(
      {
        uris: ['/image/20140721_144421b.jpg.json'],
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
