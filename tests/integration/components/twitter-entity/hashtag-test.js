import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('twitter-entity/hashtag', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    this.set('hashtagEntity', {
      text: 'foo'
    });

    await render(hbs`{{twitter-entity/hashtag entity=hashtagEntity}}`);

    assert.equal(
      this.$().html(),
      '<a href="https://twitter.com/search?q=%23foo">#foo</a>'
    );
  });
});