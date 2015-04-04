import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  entity: null,
  attributeBindings: ['title', 'href', 'target'],
  target: '_blank'
});
