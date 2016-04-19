// Do a search that applies the search transform.
//
// Hint: use qb.where(...).slice(qb.transform('transform-name', params))
var ml = require('marklogic');
var conn = require('../config.js').reader;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

db.documents.query(
  // TODO: define the query and apply the transform
  qb.where(
    qb.collection('image')
  )
  .slice(qb.transform('add-image-sizes', null))
).result()
.then(function(docs) {
  // TODO: print the results
  console.log('Search results: ' + JSON.stringify(docs, null, 2));
})
.catch(function(error) {
  console.log('something went wrong: ' + error);
});
