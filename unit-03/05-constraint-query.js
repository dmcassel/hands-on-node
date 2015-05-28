// Instead of looking for Atlanta as a string, let's make sure it's in the city
// JSON property.

var ml = require('marklogic');
var conn = require('../config.js').connection;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

db.documents.query(
  qb.where(
    qb.parsedFrom(
      'city:Atlanta',
      qb.parseBindings(
        qb.value('city', qb.bind('city'))
      ))
  )
  .withOptions({metrics: true})
).result()
.then(function(docs) {
  console.log('This search found ' + docs[0].total + ' docs');
})
.catch(function(error) {
  console.log('something went wrong: ' + error);
});
