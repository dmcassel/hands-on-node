// Search for documents using text and return facets.

// Search for documents that contain 'apple' and return a facet with the
// country.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

db.documents.query(
  qb.where(
    qb.parsedFrom('apple')
  )
  .calculate(qb.facet('Country', qb.property('country'),
    qb.facetOptions('limit=10', 'descending')))
  .withOptions({metrics: true})
).result()
.then(function(docs) {
  console.log('This search found: ' + JSON.stringify(docs));
})
.catch(function(error) {
  console.log('something went wrong: ' + error);
});
