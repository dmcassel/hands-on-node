// Patch a document: add the state to the JSON document we just loaded.

// Patching allows us to insert, replace, or delete JSON properties. We can
// also use this to update XML documents.

// See http://docs.marklogic.com/guide/node-dev/partial-update for details.

var ml = require('marklogic');
var conn = require('../config.js').connection;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;

db.documents.patch(
  '/image/20140721_144421b.jpg.json',
  pb.insert(
    '/location/city',
    'after',
    {state: 'Maine'}
  )
).result()
  .then(function(){
    console.log('state added');
  })
  .catch(function(error) {
    console.log('Problem adding state: ' + error);
  });
