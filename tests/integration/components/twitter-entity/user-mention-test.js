import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('twitter-entity/user-mention', 'Integration | Component | twitter entity/user mention', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.set('userMentionEntity', {
    screen_name: 'emberjs'
  });

  this.render(hbs`{{twitter-entity/user-mention entity=userMentionEntity}}`);

  assert.equal(
    this.$().html(),
    '<a href="https://twitter.com/emberjs">@emberjs</a>'
  );
});
