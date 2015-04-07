import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('twitter-entity/plain-text');

test('it renders', function(assert) {
  assert.expect(2);

  let text = 'Hello World';
  let component = this.subject({text});

  Ember.run(function() {
    component.appendTo('#qunit-fixture');
  });

  let html = $('#qunit-fixture').html();

  assert.equal(html, 'Hello World');
  assert.ok(!html.match('<div'), 'tagless');
});
