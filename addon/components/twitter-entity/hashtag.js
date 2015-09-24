import Component from 'ember-component';
import computed from 'ember-computed';
import jQuery from 'jquery';
import layout from '../../templates/components/twitter-entity/hashtag';

export default Component.extend({
  layout: layout,
  tagName: '',

  href: computed(function() {
    return 'https://twitter.com/search?' + jQuery.param({
      q: '#' + this.getAttr('entity').text
    });
  })
});
