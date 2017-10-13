/* eslint-disable camelcase */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('twitter-entity/url', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('urlEntity', {
    url: 'http://t.co/foo',
    display_url: 'foo.com'
  });

  this.render(hbs`{{twitter-entity/url entity=urlEntity}}`);

  assert.equal(this.$().html(), '<a href="http://t.co/foo">foo.com</a>');
});
