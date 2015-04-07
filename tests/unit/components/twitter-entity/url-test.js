import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('twitter-entity/url');

test('it renders', function(assert) {
  assert.expect(1);

  let entity = {
    url: 'http://t.co/foo<script>alert(1)</script>',
    expanded_url: 'http://foo.com',
    display_url: 'foo.com'
  };

  let component = this.subject({entity});

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('<a id="[^"]+" class="[^"]+" title="http://foo.com" href="http://t.co/foo&lt;script&gt;alert\\(1\\)&lt;/script&gt;" target="_blank">foo.com</a>');

  assert.ok(regex.test(html));
});
