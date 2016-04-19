// Exercise:
// Rerun 01-write-document.js and 02-update-document.js before doing this exercise.
//
// The Geophoto application lets us provide a title for a picture. Add a title
// property with the value "Portland Head Lighthouse". This should be a child
// of the root element. When you're done, '/image/20140721_144421b.jpg.json'
// should look like this:
// {
//   "originalFilename":"../data/photos/20140721_144421b.jpg",
//   "filename":"20140721_144421b.jpg",
//   "binary":"/binary/20140721_144421b.jpg",
//   "make":"SAMSUNG",
//   "model":"SAMSUNG-SM-G900A",
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
// application and see the title.

var ml = require('marklogic');
var conn = require('../config.js').admin;
var db = ml.createDatabaseClient(conn);
var pb = ml.patchBuilder;
var imgURI = '/image/20140721_144421b.jpg.json';

db.documents.patch(
  imgURI,
  pb.insert(
    '/location',
    'after',
    {title: 'Portland Head Lighthouse'}
  )
).result()
  .then(function(){
    console.log('Title added');

    return db.documents.read(imgURI).result();
  })
  .then(function(docs) {
    // write out the document
    console.log(docs[0].content);
  })
  .catch(function(error) {
    console.log('Problem adding title: ' + error);
  });
