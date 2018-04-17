/**
 * @fileoverview Check that MongoDB mutation includes the namespace
 * @author Nathan Muir
 */


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Check that MongoDB mutation includes the namespace',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    messages: {
      unresolvedSelector: 'Unresolved selector',
      missingKey: 'Missing key in selector \'{{ name }}\'',
    },
    schema: [
      {
        type: 'object',
        properties: {
          collections: {
            type: 'object',
            additionalProperties: {
              type: 'array',
              minItems: 1,
              items: { type: 'string' },
              uniqueItems: true,
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function getPropertyName(property) {
      if (property.type === 'Literal') {
        return property.value;
      } else if (property.type === 'Identifier') {
        return property.name;
      }
      return false;
    }

    function isMutationMethod(property) {
      const name = getPropertyName(property);
      return name === 'update' || name === 'remove';
    }

    function validateSelector(collectionKeys, collectionName, selectorNode) {
      const desiredKeys = collectionKeys[collectionName];
      if (desiredKeys == null || desiredKeys.length === 0) {
        return;
      }
      if (selectorNode.type !== 'ObjectExpression') {
        context.report({ node: selectorNode, messageId: 'unresolvedSelector' });
        return;
      }
      const keys = selectorNode.properties.map(entry => getPropertyName(entry.key));
      desiredKeys.forEach((desiredKey) => {
        if (!keys.includes(desiredKey)) {
          context.report({ node: selectorNode, messageId: 'missingKey', data: { name: desiredKey } });
        }
      });
    }
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    const options = context.options[0] || {};
    const collectionKeys = options.collections || {};

    return {
      CallExpression: (node) => {
        const ok = node.arguments.length > 0 &&
                  node.callee.type === 'MemberExpression' &&
                  isMutationMethod(node.callee.property);
        if (!ok) {
          return;
        }
        const sourceCode = context.getSourceCode();
        const collectionName = sourceCode.getText(node.callee.object);
        const selector = node.arguments[0];
        validateSelector(collectionKeys, collectionName, selector);
      },
    };
  },
};
