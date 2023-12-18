import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('twitter-entity/url', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    this.urlEntity = {
      url: 'http://t.co/foo',
      display_url: 'foo.com'
    };

    await render(hbs`<TwitterEntity::Url @entity={{this.urlEntity}} />`);

    assert.strictEqual(
      this.element.innerHTML,
      '<a href="http://t.co/foo">foo.com</a>'
    );
  });
});
