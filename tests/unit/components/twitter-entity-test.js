import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('twitter-entity');

test('it renders', function(assert) {
  assert.expect(1);

  let component = this.subject({
    href: 'http://fooentity',
    title: 'foo entity',
    target: '_foo'
  });

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('<a id="[^"]+" class="[^"]+" title="foo entity" href="http://fooentity" target="_foo">');

  assert.ok(regex.test(html));
});
