// Install your new search transform.

var fs = require('fs');
var marklogic = require('marklogic');
var conn = require('../config.js').restAdmin;
var db = marklogic.createDatabaseClient(conn);

db.config.transforms.write({
  name: 'FILL IN NAME',
  format: 'javascript',
  source: fs.createReadStream('./FILL IN FILE NAME'),
  // everything below this is optional metadata
  title: 'TITLE',
  description: 'DESCRIPTION',
  provider: 'PROVIDER',
  version: 1.0
}).result()
.then(function(response) {
  console.log('Installed transform: ' + response.name);
})
.catch(function(error) {
  console.log(JSON.stringify(error, null, 2));
});
