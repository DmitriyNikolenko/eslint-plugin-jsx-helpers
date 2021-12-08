module.exports = function extractJsxElementName(node) {
  return (
    node.openingElement.name?.name ||
    node.openingElement.name?.object?.name ||
    null
  );
};
