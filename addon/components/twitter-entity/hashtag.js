import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/twitter-entity/hashtag';


export default Component.extend({
  layout,
  tagName: '',

  href: computed(function() {
    const hashtag = `#${this.get('entity.text')}`;
    return `https://twitter.com/search?q=${encodeURIComponent(hashtag)}`;
  })
});
