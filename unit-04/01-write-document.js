// Write an image and a JSON file to the database.

// MarkLogic allows us to generate the URIs for documents, if we want. We can
// also transform content as it is loaded. For details, see
// http://docs.marklogic.com/guide/node-dev/documents#id_85896

var fs = require('fs');
var ml = require('marklogic');
var conn = require('../config.js').connection;
var db = ml.createDatabaseClient(conn);

db.documents.write(
  {
    uri: '/image/20140721_144421b.jpg.json',
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
).result()
  .then(function(){
    console.log('files loaded');
  })
  .catch(function(error) {
    console.log('Problem writing file: ' + error);
  });
