import TwitterEntityComponent from '../twitter-entity';
import layout from '../../templates/components/twitter-entity/url';

export default TwitterEntityComponent.extend({
  layout: layout,
  title: Ember.computed.alias('entity.expanded_url'),
  href: Ember.computed(function() {
    return this.get('entity.url');
  })
});
