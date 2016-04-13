
// Search for documents that have 'San Francisco' in the city property, using
// Query-By-Example.

// Other QBE tricks:
//   qb.byExample({city: { $word: 'san'} }) -- look for 'san' as a word in the
//     city property. Case insensitive.
//   qb.byExample({reputation: { $gt: 100 } }) -- do a range comparison
//   qb.byExample({$filtered: true}) -- turn on filtered search
// Combine the above (AND semantics):
//   qb.byExample(
//     { city: { $word: 'san'}},
//     { reputation: { $gt: 100 }},
//     { $filtered: true}
//   )


var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

db.documents.query(
  qb.where(
    qb.byExample({ city: 'San Francisco' })
  )
  .withOptions({metrics: true})
).result()
.then(function(docs) {
  console.log('This search found ' + docs[0].total + ' docs');
})
.catch(function(error) {
  console.log('something went wrong: ' + error);
});
