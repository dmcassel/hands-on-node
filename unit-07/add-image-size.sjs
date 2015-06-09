// Document-read transformation to add the size of the binary image.

function addImageSize(context, params, content)
{
  var mutableDoc = content.toObject();
  var binaryURI = mutableDoc.binary;
  var binaryDoc = cts.doc(binaryURI);
  mutableDoc.binarySize = xdmp.binarySize(binaryDoc.root);

  return mutableDoc;
}

exports.transform = addImageSize;
