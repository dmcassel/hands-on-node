// Document-read transformation to add the size of the binary image.

function addImageSize(context, params, content)
{
  // content is the document that has been read.
  // Turn it into a JS object
  var mutableDoc = content.toObject();
  // Look up the URI of the associated binary document
  var binaryURI = mutableDoc.binary;
  // Retrieve the binary document
  var binaryDoc = cts.doc(binaryURI);
  // Find and record the size of the binary (in bytes)
  mutableDoc.binarySize = xdmp.binarySize(binaryDoc.root);

  // Return the revised data
  return mutableDoc;
}

exports.transform = addImageSize;
