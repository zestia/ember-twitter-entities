import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('twitter-entity/symbol', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    this.symbolEntity = {
      text: 'foo'
    };

    await render(hbs`<TwitterEntity::Symbol @entity={{this.symbolEntity}} />`);

    assert.strictEqual(
      this.element.innerHTML,
      '<a href="https://twitter.com/search?q=%24foo">$foo</a>'
    );
  });
});
