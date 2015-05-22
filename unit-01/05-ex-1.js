var ml = require('marklogic');
var conn = require('./config.js').connection;
var db = ml.createDatabaseClient(conn);

// Task: Print the city where image 03.JPG was taken.
//       Use the Promise method.
// URI: /image/03.JPG.json
// JSON path within document: location.city

