/**
 * @fileoverview Check that MongoDB mutation includes the namespace
 * @author Nathan Muir
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/mutation-namespace');
const { RuleTester } = require('eslint');


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const defaultOptions = [{
  collections: {
    NamespacedCollection: ['prop1'],
    'Another.Collection.Name': ['prop2'],
    MultiNamespaces: ['prop1', 'prop2', 'prop3'],
  },
}];
ruleTester.run('mutation-namespace', rule, {

  valid: [

    { code: 'SomeCollection.findOne(\'abc\')', options: defaultOptions },
    { code: 'NamespacedCollection.findOne(\'abc\')', options: defaultOptions },
    { code: 'NamespacedCollection.update({_id: \'abc\', prop1: \'def\'}, {$set: {potato: true}})', options: defaultOptions },
    { code: 'NamespacedCollection.remove({_id: \'abc\', prop1: \'def\'})', options: defaultOptions },
    { code: 'Another.Collection.Name.update({_id: \'abc\', prop2: \'def\'}, {$set: {potato: true}})', options: defaultOptions },
    { code: 'Another.Collection.Name.remove({_id: \'abc\', prop2: \'def\'})', options: defaultOptions },
    { code: 'var prop2 = \'def\'; Another.Collection.Name.remove({_id: \'abc\', prop2: prop2}, {$set: {potato: true}})', options: defaultOptions },
    { code: 'MultiNamespaces.update({prop1: 123, prop2: \'def\', prop3: 456}, {$set: {potato: true}})', options: defaultOptions },
  ],

  invalid: [
    {
      code: 'var varName = {}; NamespacedCollection.update(varName, {$set: {potato: true}})',
      options: defaultOptions,
      errors: [{
        messageId: 'unresolvedSelector',
      }],
    },
    {
      code: 'NamespacedCollection.update({_id: \'abc\'}, {$set: {potato: true}})',
      options: defaultOptions,
      errors: [{
        messageId: 'missingKey',
        data: {
          name: 'prop1',
        },
      }],
    },
    {
      code: 'Another.Collection.Name.update({prop1: \'abc\'}, {$set: {potato: true}})',
      options: defaultOptions,
      errors: [{
        messageId: 'missingKey',
        data: {
          name: 'prop2',
        },
      }],
    },
    {
      code: 'MultiNamespaces.update({}, {$set: { potato: true}})',
      options: defaultOptions,
      errors: [{
        messageId: 'missingKey',
        data: {
          name: 'prop1',
        },
      }, {
        messageId: 'missingKey',
        data: {
          name: 'prop2',
        },
      }, {
        messageId: 'missingKey',
        data: {
          name: 'prop3',
        },
      }],
    },
  ],
});
