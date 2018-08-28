import { module, test } from 'qunit';
/* eslint-disable camelcase */

import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('twitter-entity/user-mention', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    this.set('userMentionEntity', {
      screen_name: 'emberjs'
    });

    await render(hbs`{{twitter-entity/user-mention entity=userMentionEntity}}`);

    assert.equal(
      this.element.innerHTML,
      '<a href="https://twitter.com/emberjs">@emberjs</a>'
    );
  });
});
