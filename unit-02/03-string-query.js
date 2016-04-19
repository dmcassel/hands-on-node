// Search for documents using text.

// Search for documents that contain either the word 'atlanta' or the phrase
// 'san francisco' -- note the extra layer of quotes.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

db.documents.query(
  qb.where(
    qb.parsedFrom('atlanta OR "san francisco"')
  )
  .withOptions({metrics: true})
).result()
.then(function(docs) {
  console.log('This search found ' + docs[0].total + ' docs');
})
.catch(function(error) {
  console.log('something went wrong: ' + error);
});
