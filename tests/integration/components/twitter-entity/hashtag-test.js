import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('twitter-entity/hashtag', 'Integration | Component | twitter entity/hashtag', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('hashtagEntity', {
    text: 'foo'
  });

  this.render(hbs`{{twitter-entity/hashtag entity=hashtagEntity}}`);

  assert.equal(
    this.$().html(),
    '<a href="https://twitter.com/search?q=%23foo">#foo</a>'
  );
});
