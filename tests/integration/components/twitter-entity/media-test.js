import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('twitter-entity/media', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    this.mediaEntity = {
      url: 'http://t.co/myimg',
      display_url: 'pic.twitter.com/123'
    };

    await render(hbs`<TwitterEntity::Media @entity={{this.mediaEntity}} />`);

    assert.strictEqual(
      this.element.innerHTML,
      '<a href="http://t.co/myimg">pic.twitter.com/123</a>'
    );
  });
});
