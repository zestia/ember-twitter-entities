import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('twitter-entity/user-mention', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    this.userMentionEntity = {
      screen_name: 'emberjs'
    };

    await render(
      hbs`<TwitterEntity::UserMention @entity={{this.userMentionEntity}} />`
    );

    assert.equal(
      this.element.innerHTML,
      '<a href="https://twitter.com/emberjs">@emberjs</a>'
    );
  });
});
