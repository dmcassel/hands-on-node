
// Search for documents that contain either the word 'atlanta' or the phrase
// 'san francisco' -- note the extra layer of quotes.
// The difference between this one and 03-string-query.js is the use of qb.or().

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

db.documents.query(
  qb.where(
    qb.or(
      qb.term('atlanta'),
      qb.term('"san francisco"')
    )
  )
  .withOptions({metrics: true})
).result()
.then(function(docs) {
  console.log('This search found ' + docs[0].total + ' docs');
})
.catch(function(error) {
  console.log('something went wrong: ' + error);
});
