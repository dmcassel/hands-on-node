// Exercise:
// Rerun 05-adding-a-collection.js before doing this exercise.
//
// In 05-adding-a-collection.js, '/image/20140721_144421b.jpg.json' was added
// to the 'phone' collection. Now remove it from that collection.

var ml = require('marklogic');
var conn = require('../config.js').connection;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;
