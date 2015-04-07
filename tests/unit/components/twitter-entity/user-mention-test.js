import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('twitter-entity/user-mention');

test('it renders', function(assert) {
  assert.expect(1);

  let entity = { screen_name: 'emberjs' };
  let component = this.subject({entity});

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('<a id="[^"]+" class="[^"]+" href="https://twitter.com/emberjs" target="_blank">@emberjs</a>');

  assert.ok(regex.test(html));
});
