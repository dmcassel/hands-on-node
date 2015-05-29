// Delete a document.

// You can also delete a collection or a directory.
// See http://docs.marklogic.com/guide/node-dev/documents#id_30566 for details.

var ml = require('marklogic');
var conn = require('../config.js').connection;
var db = ml.createDatabaseClient(conn);

db.documents.remove(
  '/image/20140721_144421b.jpg.json'
).result()
  .then(function(response) {
    console.log('Document ' + response.uri + ' was ' + (response.removed ? '' : 'not ') + 'removed.' );
  })
  .catch(function(error) {
    console.log('Failed to delete document: ' + error);
  });
