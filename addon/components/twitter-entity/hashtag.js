import Ember from 'ember';
import TwitterEntityComponent from '../twitter-entity';
import layout from '../../templates/components/twitter-entity/hashtag';

export default TwitterEntityComponent.extend({
  layout: layout,
  href: Ember.computed(function() {
    return 'https://twitter.com/search?' + Ember.$.param({
      q: '#' + this.get('entity.text')
    });
  })
});
