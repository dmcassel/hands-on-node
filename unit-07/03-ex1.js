// Write a transform that will work on search results, adding the binary image
// size as metadata to each result.

function addImageSizes(context, params, content)
{
  if (context.inputType.search('json') >= 0) {
    var result = content.toObject();
    if (result.hasOwnProperty('snippet-format')) {
      // This is a metadata section

    } else {
      // This is one document
      // TODO: calculate the size of the binary, add it to result

    }
  }

  return content;
}

exports.transform = addImageSizes;
