import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/template';

module('twitter-entities', function (hooks) {
  setupRenderingTest(hooks);

  test('built in components', async function (assert) {
    assert.expect(1);

    this.text = [
      'url1: url1',
      'url2: url2',
      'hashtag1: hashtag1',
      'user mention: user mention',
      'media: media',
      'symbol: symbol1',
      'html: <script>',
      'emojis: 💥 hashtag2',
      'trailing: text'
    ].join('\n');

    this.entities = {
      urls: [
        {
          url: 'http://t.co/url2',
          display_url: 'url2.com',
          indices: [17, 21]
        },
        {
          url: 'http://t.co/url1',
          display_url: 'url1.com',
          indices: [6, 10]
        }
      ],
      hashtags: [
        {
          text: 'hashtag2',
          indices: [122, 130]
        },
        {
          text: 'hashtag1',
          indices: [32, 40]
        }
      ],
      user_mentions: [
        {
          screen_name: 'baz',
          indices: [55, 67]
        }
      ],
      media: [
        {
          url: 'http://t.co/qux',
          display_url: 'pic.twitter.com/qux',
          indices: [75, 80]
        }
      ],
      symbols: [
        {
          text: 'symbol1',
          indices: [89, 96]
        }
      ]
    };

    await render(hbs`
      <TwitterEntities
        @text={{this.text}}
        @entities={{this.entities}}
      />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      `url1: <a href="http://t.co/url1">url1.com</a>
url2: <a href="http://t.co/url2">url2.com</a>
hashtag1: <a href="https://twitter.com/search?q=%23hashtag1">#hashtag1</a>
user mention: <a href="https://twitter.com/baz">@baz</a>
media: <a href="http://t.co/qux">pic.twitter.com/qux</a>
symbol: <a href="https://twitter.com/search?q=%24symbol1">$symbol1</a>
html: &lt;script&gt;
emojis: 💥 <a href="https://twitter.com/search?q=%23hashtag2">#hashtag2</a>
trailing: text`
    );
  });

  test('custom components', async function (assert) {
    assert.expect(1);

    const url = hbs`<span>custom url: {{@entity.display_url}}</span>`;
    const hashtag = hbs`<span>custom hashtag: {{@entity.text}}</span>`;
    const userMention = hbs`<span>custom user mention: {{@entity.screen_name}}</span>`;
    const media = hbs`<span>custom media: {{@entity.media_url_https}}</span>`;
    const symbol = hbs`<span>custom symbol: {{@entity.text}}</span>`;

    this.owner.register('template:components/custom-url', url);
    this.owner.register('template:components/custom-hashtag', hashtag);
    this.owner.register('template:components/custom-user-mention', userMention);
    this.owner.register('template:components/custom-media', media);
    this.owner.register('template:components/custom-symbol', symbol);

    this.text = [
      'url: url',
      'hashtag: hashtag',
      'user mention: user mention',
      'media: media',
      'symbol: symbol'
    ].join('\n');

    this.entities = {
      urls: [
        {
          url: 'http://t.co/foo',
          display_url: 'foo.com',
          indices: [5, 8]
        }
      ],
      hashtags: [
        {
          text: 'bar',
          indices: [18, 25]
        }
      ],
      user_mentions: [
        {
          screen_name: 'baz',
          indices: [40, 52]
        }
      ],
      media: [
        {
          url: 'http://t.co/qux',
          display_url: 'pic.twitter.com/qux',
          media_url_https: 'https://pbs.twimg.com/media/qux.jpg',
          indices: [60, 65]
        }
      ],
      symbols: [
        {
          text: 'norf',
          indices: [74, 80]
        }
      ]
    };

    await render(hbs`
      <TwitterEntities
        @text={{this.text}}
        @entities={{this.entities}}
        @Url={{component "custom-url"}}
        @Hashtag={{component "custom-hashtag"}}
        @UserMention={{component "custom-user-mention"}}
        @Media={{component "custom-media"}}
        @Symbol={{component "custom-symbol"}}
      />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      `url: <span>custom url: foo.com</span>
hashtag: <span>custom hashtag: bar</span>
user mention: <span>custom user mention: baz</span>
media: <span>custom media: https://pbs.twimg.com/media/qux.jpg</span>
symbol: <span>custom symbol: norf</span>`
    );
  });

  test('html safe tweets', async function (assert) {
    assert.expect(1);

    this.text = htmlSafe('<b>Visit</b> foo.com');

    this.entities = {
      urls: [
        {
          url: 'http://t.co/foo',
          display_url: 'foo.com',
          indices: [13, 20]
        }
      ]
    };

    await render(hbs`
      <TwitterEntities
        @text={{this.text}}
        @entities={{this.entities}}
      />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      '<b>Visit</b> <a href="http://t.co/foo">foo.com</a>',
      'if the tweet is marked as safe, html can be output'
    );
  });

  test('unsupported entity types', async function (assert) {
    assert.expect(1);

    this.entities = {
      foo: [
        {
          indices: [6, 11]
        }
      ]
    };

    await render(hbs`
      <TwitterEntities
        @text="Hello World"
        @entities={{this.entities}}
      />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      'Hello World',
      'still renders text if no backing component is provided for the given entities'
    );
  });
});
