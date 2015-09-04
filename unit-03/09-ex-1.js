// Write a query that finds pictures taken with "LGE" phones in Colombia.
// Hint: you'll look in the "make" and "country" JSON properties.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

db.documents.query(
  qb.where(
    qb.byExample({
      make: 'LGE',
      country: 'Colombia'
    })
  )
  .withOptions({metrics: true})
).result()
.then(function(docs) {
  console.log('This search found ' + docs[0].total + ' docs');
})
.catch(function(error) {
  console.log('something went wrong: ' + error);
});
