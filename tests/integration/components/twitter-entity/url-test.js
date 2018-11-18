import { module, test } from 'qunit';
/* eslint-disable camelcase */

import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('twitter-entity/url', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    this.set('urlEntity', {
      url: 'http://t.co/foo',
      display_url: 'foo.com'
    });

    await render(hbs`{{twitter-entity/url entity=this.urlEntity}}`);

    assert.equal(this.element.innerHTML, '<a href="http://t.co/foo">foo.com</a>');
  });
});
