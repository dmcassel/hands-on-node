// Do multiple calls to MarkLogic using the same transaction.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;
var qb = ml.queryBuilder;
var bPromise = require('bluebird');

var updates = [];

// Create a transaction
db.transactions.open().result().then(function(txid) {
  // Search for all the JSON image descriptions
  db.documents.query(
    qb.where(
      qb.collection('image')
    )
    .slice(1, 1000, qb.extract('/created'))
  ).stream()
    .on('data', function(document) {
      // process one document

      // Convert the epoch to a date we can build an index on
      var date = new Date(document.content.extracted[0].created).toISOString().slice(0,10);
      console.log(document.uri + ' was created on ' + date);

      updates.push(db.documents.patch(
        document.uri,
        pb.replaceInsert(
          '/createdDate',
          '/created',
          'after',
          { createdDate: date }
        ),
        'content',
        txid
      ).result());
    }).on('end', function() {
      // All JSON image descriptions received. Wait for updates to finish.
      bPromise.all(updates)
        .then(function() {
          // All updates succeeded. Commit the transaction.
          db.transactions.commit(txid);
          console.log('All done.');
        })
        .catch(function(error){
          // Something went wrong. Roll back the transaction.
          db.transactions.rollback(txid);
          console.log('Error: ' + error);
        });
    }).on('error', function(error) {
      // Something went wrong. Roll back the transaction.
      db.transactions.rollback(txid);
      console.log('Problem reading documents: ' + error);
    });
});
