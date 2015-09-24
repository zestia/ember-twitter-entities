import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('twitter-entity/media', 'Integration | Component | twitter entity/media', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('mediaEntity', {
    url: 'http://t.co/myimg',
    display_url: 'pic.twitter.com/123'
  });

  this.render(hbs`{{twitter-entity/media entity=mediaEntity}}`);

  assert.equal(
    this.$().html(),
    '<a href="http://t.co/myimg">pic.twitter.com/123</a>'
  );
});
