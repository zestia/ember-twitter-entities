import Component from 'ember-component';
import computed from 'ember-computed';
import jQuery from 'jquery';
import layout from '../../templates/components/twitter-entity/hashtag';

export default Component.extend({
  layout,
  tagName: '',

  href: computed(function() {
    const hashtag = this.get('entity.text');
    const params = jQuery.param({ q: `#${hashtag}` });
    return `https://twitter.com/search?${params}`;
  })
});
