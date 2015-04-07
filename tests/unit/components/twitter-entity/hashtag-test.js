import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('twitter-entity/hashtag');

test('it renders', function(assert) {
  assert.expect(1);

  let entity = { text: 'crm' };
  let component = this.subject({entity});

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('<a id="[^"]+" class="[^"]+" href="https://twitter.com/search\\?q=%23crm" target="_blank">#crm</a>');

  assert.ok(regex.test(html));
});
