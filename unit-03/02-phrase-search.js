// Search for documents that contain the phrase 'iphone 4' -- note the extra
// layer of quotes.

var ml = require('marklogic');
var conn = require('../config.js').connection;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

db.documents.query(
  qb.where(
    qb.term('"iphone 4"')
  )
  .withOptions({metrics: true})
).result()
.then(function(docs) {
  console.log('This search found ' + docs[0].total + ' docs');
})
.catch(function(error) {
  console.log('something went wrong: ' + error);
});
