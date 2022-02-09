/** jsx-enforce-attribute rule */
const extractJsxElementName = require("../utils/extractJsxElementName");

module.exports = {
  meta: {
    docs: {
      description:
        "Enforce use of certain attributes on specific JSX elements",
      category: "Project specific rules",
      recommended: false,
    },
    messages: {
      jsxAttributeIsRequired:
        'Using attribute {{attributeName}} is required for an element matching regexp "{{matchedElementName}}"',
    },
  },
  create: (context) => ({
    JSXElement(node) {
      // Obtain options from the rule declaration.
      const { attributeName, elementMatchers } = context.options[0] || {};
      if (!attributeName || !elementMatchers) {
        return console.log(
          'Properties attributeName & elementMatchers are absent for a rule "jsx-enforce-attribute"'
        );
      }

      // Look for an element name.
      const elementName = extractJsxElementName(node);
      if (!elementName) {
        return; // console.log('No element name found');
      }

      // Determine does element name match any of passed matchers.
      let matchedElementName = false;
      for (const elementMatcher of elementMatchers) {
        if (new RegExp(elementMatcher).test(elementName)) {
          matchedElementName = elementMatcher;
        }
      }
      if (!matchedElementName) {
        return; // console.log(`${elementName} doesn't match any matcher`);
      }

      // Check is testId attribute present
      let hasTestIdAttribute = false;
      for (const attribute of node.openingElement.attributes) {
        if (attribute?.name?.name === attributeName) {
          hasTestIdAttribute = true;
        }
      }

      // Report when testId attribute is absent.
      if (!hasTestIdAttribute) {
        context.report({
          messageId: "jsxAttributeIsRequired",
          node,
          data: {
            attributeName,
            matchedElementName,
          },
        });
      }
    },
  }),
};
