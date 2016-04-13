// Write a query that finds pictures taken with "LGE" phones in Colombia.
// Hint: you'll look in the "make" and "country" JSON properties.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var qb = ml.queryBuilder;

