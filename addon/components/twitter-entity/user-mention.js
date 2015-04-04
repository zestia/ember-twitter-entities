import TwitterEntityComponent from '../twitter-entity';
import layout from '../../templates/components/twitter-entity/user-mention';

export default TwitterEntityComponent.extend({
  layout: layout,
  href: Ember.computed(function() {
    return 'https://twitter.com/' + this.get('entity.screen_name');
  })
});
