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

// Change the 'binary' JSON property
function updateJSONdoc(binaryURI, updatedBinaryURI, transactionID) {
  // patch the JSON document

  console.log('changing ' + binaryURI + ' to ' + updatedBinaryURI);
  return db.documents.patch({
    uri: jsonURI,
    operations: pb.replace('/binary', updatedBinaryURI),
    txid: transactionID
  }).result();

}

function getBinaryImage(binaryURI, transactionID) {
  // get the binary image
  console.log('retrieving ' + binaryURI);
  return db.documents.read({uris: binaryURI, categories: ['content', 'collections']}).result();
}

function insertBinary(binaryDocDesc, updatedBinaryURI, transactionID) {
  // Insert the binary image at its new URI
  console.log('inserting image at ' + updatedBinaryURI);

  return db.documents.write({
    documents: {
      uri: updatedBinaryURI,
      contentType: binaryDocDesc.contentType,
      collections: binaryDocDesc.collections,
      content: binaryDocDesc.content
    },
    txid: transactionID
  }).result();
}

function deleteBinary(binaryURI, transactionID) {
  // Remove the original binary image
  console.log('removing image from ' + binaryURI);
  db.documents.remove({ uris: binaryURI, txid: transactionID}).result();
}

// Create a transaction
db.transactions.open(true).result()
  .then(function(txResponse) {
    var transactionID = txResponse;
    // Search for all the JSON image descriptions
    db.documents.read(jsonURI).result()
      .then(function(jsonDoc){
        var binaryURI = jsonDoc[0].content.binary;
        var updatedBinaryURI = binaryURI.toLowerCase();
        getBinaryImage(binaryURI, transactionID)
          .then(function(binaryDocDesc){
            Promise.all(
              [
                updateJSONdoc(binaryURI, updatedBinaryURI, transactionID),
                insertBinary(binaryDocDesc[0], updatedBinaryURI, transactionID),
                deleteBinary(binaryURI, transactionID)
              ])
              .then(function(){
                // We've gotten this far, so everything worked. Commit.
                console.log('done... commit!');
                db.transactions.commit(txResponse);
              });
          });
      })
      .catch(function(error) {
        // Something went wrong. Roll back the transaction.
        console.log('Problem: ' + error);
        db.transactions.rollback(txResponse);
      });
  });
