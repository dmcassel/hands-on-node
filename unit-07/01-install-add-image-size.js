// Install the add-image-size transform.
//
// The transform is written in JavaScript.
// Note the .sjs file extension. Yes, this matters!
// It matters because if the transform has a .js extension, MarkLogic
// associates the application/javascript mimetype with it; .sjs files get the
// application/vnd.marklogic-javascript mimetype, which is expected for
// executable files. MarkLogic expects files with the application/javascript
// mimetype will be executed by a brower and treats them as just data.
// Files with the application/vnd.marklogic-javascript mimetype are recognized
// as code that MarkLogic can run.

var fs = require('fs');
var marklogic = require('marklogic');
var conn = require('../config.js').restAdmin;
var db = marklogic.createDatabaseClient(conn);

db.config.transforms.write({
  name: 'add-image-size',
  format: 'javascript',
  source: fs.createReadStream('./add-image-size.sjs'),
  // everything below this is optional metadata
  title: 'Add Image Size',
  description: 'Adds the size of the binary image to the search result',
  provider: 'MarkLogic',
  version: 1.0
}).result()
.then(function(response) {
  console.log('Installed transform: ' + response.name);
})
.catch(function(error) {
  console.log(JSON.stringify(error, null, 2));
});
