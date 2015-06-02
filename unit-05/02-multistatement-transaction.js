// Do multiple calls to MarkLogic using the same transaction.

var ml = require('marklogic');
var conn = require('../config.js').connection;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;
var qb = ml.queryBuilder;
var bPromise = require('bluebird');

var txid = db.transactions.open();

var updates = [];

db.documents.query(
  qb.where(
    qb.collection('image')
  )
  .slice(1, 1000, qb.extract('/created'))
).stream()
  .on('data', function(document) {
    // process one document
    // document.content.extracted[0].created
    var date = new Date(document.content.extracted[0].created).toISOString().slice(0,10);
    console.log(document.uri + ' was created on ' + date);

    updates.push(db.documents.patch(
      document.uri,
      pb.insert(
        '/created',
        'after',
        { createdDate: date }
      ),
      'content',
      txid
    ).result());
  }).on('end', function() {
    // all data received
    bPromise.all(updates);
    db.transactions.commit(txid);
    console.log('All done.');
  }).on('error', function(error) {
    // handle errors
    db.transactions.rollback(txid);
    console.log('Something went wrong: ' + error);
  });
