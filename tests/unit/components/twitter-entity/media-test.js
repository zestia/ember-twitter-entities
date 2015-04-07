import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('twitter-entity/media');

test('it renders', function(assert) {
  assert.expect(1);

  let entity = {
    url: 'http://t.co/myimg',
    display_url: 'pic.twitter.com/123',
    expanded_url: 'http://twitter.com/foo/status/abc/photo/123',
    media_url_https: 'https://pbs.twimg.com/media/123.jpg',
    sizes: {
      thumb: {
        w: 10,
        h: 20
      },
      small: {
        w: 20,
        h: 30
      }
    }
  };

  let component = this.subject({entity});

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('<a id="[^"]+" class="[^"]+" title="http://twitter.com/foo/status/abc/photo/123" href="http://t.co/myimg" target="_blank"><img src="https://pbs.twimg.com/media/123.jpg:thumb" width="10" height="20"></a>');

  assert.ok(regex.test(html));
});
