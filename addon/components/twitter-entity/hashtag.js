import Component from '@ember/component';
/* eslint-disable */
import { computed } from '@ember/object';
/* eslint-enable */
import layout from '../../templates/components/twitter-entity/hashtag';

export default Component.extend({
  layout,
  tagName: '',

  href: computed(function() {
    const hashtag = `#${this.entity.text}`;
    return `https://twitter.com/search?q=${encodeURIComponent(hashtag)}`;
  })
});
