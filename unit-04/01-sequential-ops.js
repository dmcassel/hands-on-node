// Write an image and a JSON file to the database.

// MarkLogic allows us to generate the URIs for documents, if we want. We can
// also transform content as it is loaded. For details, see
// http://docs.marklogic.com/guide/node-dev/documents#id_85896

var fs = require('fs');
var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;

var jsonURI = '/image/20140721_144421b.jpg.json';

function uploadDocs() {
  return db.documents.write(
    {
      uri: jsonURI,
      contentType: 'application/json',
      content: JSON.parse(fs.readFileSync('../data/20140721_144421b.jpg.json')),
      collections: ['image']
    },
    {
      uri: '/binary/20140721_144421b.jpg',
      contentType: 'image/jpeg',
      content: fs.readFileSync('../data/20140721_144421b.jpg'),
      collections: ['binary']
    }
  ).result();
}

function addState() {
  console.log('files loaded');
  return db.documents.patch(
    jsonURI,
    pb.insert(
      '/location/city',
      'after',
      {state: 'Maine'}
    )
  ).result();
}

function readDocument() {
  console.log('updated with state');
  return db.documents.read(jsonURI).result();
}

function printDocument(docs) {
  console.log(JSON.stringify(docs));
}

uploadDocs()
  .then(addState)
  .then(readDocument)
  .then(printDocument)
  .catch(function(error) {
    console.log('Problem: ' + error);
  });
