import Ember from 'ember';
import layout from '../templates/components/twitter-entity';

export default Ember.Component.extend({
  tagName: 'a',
  entity: null,
  attributeBindings: ['title', 'href', 'target'],
  target: '_blank'
});
