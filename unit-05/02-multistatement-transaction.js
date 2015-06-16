// Do multiple calls to MarkLogic using the same transaction.
// Task: move a binary image to a different URI. As we do that, we also need to
// update the "binary" property in the corresponding JSON document so that we
// still have a path from one to the other. Since two documents are changing,
// we want to change both in the same transaction to ensure they never get
// disconnected.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;

var jsonURI = '/image/01.JPG.json';
var binaryURI = null;
var updatedBinaryURI = null;

// Create a transaction
db.transactions.open(true).result().then(function(txResponse) {
  // Search for all the JSON image descriptions
  db.documents.read(jsonURI).result()
    .then(function(doc) {
      // patch the JSON document
      binaryURI = doc[0].content.binary;
      updatedBinaryURI = binaryURI.toLowerCase();

      console.log('patching ' + jsonURI);
      return db.documents.patch({
        uri: jsonURI,
        operations: pb.replace('/binary', updatedBinaryURI),
        txid: txResponse
      }).result();
    })
    .then(function() {
      // get the binary image
      console.log('retrieving ' + binaryURI);
      return db.documents.read({uris: binaryURI, categories: ['content', 'collections']}).result();
    })
    .then(function(doc) {
      // Insert the binary image at its new URI
      console.log('inserting image at ' + updatedBinaryURI);

      return db.documents.write({
        documents: {
          uri: updatedBinaryURI,
          contentType: doc[0].contentType,
          collections: doc[0].collections,
          content: doc[0].content
        },
        txid: txResponse
      }).result();

    })
    .then(function() {
      // Remove the original binary image
      console.log('removing image from ' + binaryURI);
      db.documents.remove({ uris: binaryURI, txid: txResponse}).result();
    })
    .then(function() {
      // We've gotten this far, so everything worked. Commit.
      console.log('done... commit!');
      db.transactions.commit(txResponse);
    })
    .catch(function(error) {
      // Something went wrong. Roll back the transaction.
      console.log('Problem: ' + error);
      db.transactions.rollback(txResponse);
    });
  });
