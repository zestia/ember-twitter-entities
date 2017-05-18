import Component from 'ember-component';
import computed from 'ember-improved-cp/read-only';
import jQuery from 'jquery';
import layout from '../../templates/components/twitter-entity/hashtag';
const { param } = jQuery;

export default Component.extend({
  layout,
  tagName: '',

  href: computed(function() {
    const hashtag = this.get('entity.text');
    const params = param({ q: `#${hashtag}` });
    return `https://twitter.com/search?${params}`;
  })
});
