// Exercise:
//
// The image we inserted with 01-write-document.js describes the camera used to
// take the picture. In this exercise, we'll change the model. In the original
// document, the model is "SAMSUNG-SM-G900A". Change it to "Galaxy S5".
//
// {
//   "originalFilename":"../data/photos/20140721_144421b.jpg",
//   "filename":"20140721_144421b.jpg",
//   "binary":"/binary/20140721_144421b.jpg",
//   "make":"SAMSUNG",
//   "model":"Galaxy S5",
//   "created":1405968260000,
//   "location":{
//     "type":"Point",
//     "coordinates":[43.6231, -70.208058],
//     "city":"Cape Elizabeth",
//     "state": "Maine",
//     "country":"United States"
//   },
//   "title":"Portland Head Lighthouse"
// }
//
// After completing the exercise, you can look at the image in the Geophoto
// application and see the new make.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;
var imgURI = '/image/20140721_144421b.jpg.json';

db.documents.patch(
  imgURI,
  pb.replace(
    '/model',
    'Galaxy S5'
  )
).result()
  .then(function(){
    console.log('Camera updated');

    // print the document to see the results
	db.documents.read(imgURI).result()
  	.then(function(docs) {
    	// write out the document
    	console.log(docs[0].content);
  	})
  	.catch(function(error) {
    	console.log("Error reading document: " + error);
  	});


  })
  .catch(function(error) {
    console.log('Problem updating camera: ' + error);
  });
