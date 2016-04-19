// Install your new search transform.

var fs = require('fs');
var marklogic = require('marklogic');
var conn = require('../config.js').restAdmin;
var db = marklogic.createDatabaseClient(conn);

db.config.transforms.write({
  name: 'add-image-sizes',
  format: 'javascript',
  source: fs.createReadStream('./03-ex1.sjs'),
  // everything below this is optional metadata
  title: 'Add Image Sizes',
  description: 'Adds the binary image size to each search result',
  provider: 'Dave',
  version: 1.0
}).result()
.then(function(response) {
  console.log('Installed transform: ' + response.name);
})
.catch(function(error) {
  console.log(JSON.stringify(error, null, 2));
});
