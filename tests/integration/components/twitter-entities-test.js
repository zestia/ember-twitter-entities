import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/string';

module('twitter-entities', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    this.set(
      'text',
      [
        'url1: url1',
        'url2: url2',
        'hashtag1: hashtag1',
        'user mention: user mention',
        'media: media',
        'html: <script>',
        'emojis: 💥 hashtag2',
        'trailing: text'
      ].join('\n')
    );

    this.set('entities', {
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
          indices: [106, 114]
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
      ]
    });

    await render(hbs`
      <TwitterEntities
        @text={{this.text}}
        @entities={{this.entities}} />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      `url1: <a href="http://t.co/url1">url1.com</a>
url2: <a href="http://t.co/url2">url2.com</a>
hashtag1: <a href="https://twitter.com/search?q=%23hashtag1">#hashtag1</a>
user mention: <a href="https://twitter.com/baz">@baz</a>
media: <a href="http://t.co/qux">pic.twitter.com/qux</a>
html: &lt;script&gt;
emojis: 💥 <a href="https://twitter.com/search?q=%23hashtag2">#hashtag2</a>
trailing: text`
    );
  });

  test('custom entity components', async function (assert) {
    assert.expect(4);

    const url = hbs`<span>custom url: {{@entity.display_url}}</span>`;
    const hashtag = hbs`<span>custom hashtag: {{@entity.text}}</span>`;
    const userMention = hbs`<span>custom user mention: {{@entity.screen_name}}</span>`;
    const media = hbs`<span>custom media: <img src={{@entity.media_url_https}} alt="test"></span>`;

    this.owner.register('template:components/custom-url', url);
    this.owner.register('template:components/custom-hashtag', hashtag);
    this.owner.register('template:components/custom-user-mention', userMention);
    this.owner.register('template:components/custom-media', media);

    this.set(
      'text',
      [
        'url: url',
        'hashtag: hashtag',
        'user mention: user mention',
        'media: media'
      ].join('\n')
    );

    this.set('entities', {
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
      ]
    });

    await render(hbs`
      <TwitterEntities
        @text={{this.text}}
        @entities={{this.entities}}
        @urlComponent="custom-url"
        @hashtagComponent="custom-hashtag"
        @userMentionComponent="custom-user-mention"
        @mediaComponent="custom-media" />
    `);

    assert.equal(
      this.element.querySelectorAll('span')[0].innerHTML,
      'custom url: foo.com'
    );

    assert.equal(
      this.element.querySelectorAll('span')[1].innerHTML,
      'custom hashtag: bar'
    );

    assert.equal(
      this.element.querySelectorAll('span')[2].innerHTML,
      'custom user mention: baz'
    );

    assert.equal(
      this.element.querySelectorAll('span')[3].innerHTML,
      'custom media: <img src="https://pbs.twimg.com/media/qux.jpg" alt="test">'
    );
  });

  test('passing in custom components', async function (assert) {
    assert.expect(1);

    const url = hbs`{{@entity.display_url}} ({{@foo}})`;

    this.set('entities', {
      urls: [
        {
          url: 'http://t.co/foo',
          display_url: 'foo.com',
          indices: [6, 11]
        }
      ]
    });

    this.owner.register('template:components/custom-url', url);

    await render(hbs`
      <TwitterEntities
        @text="Hello World"
        @entities={{this.entities}}
        @urlComponent={{component "custom-url" foo="bar"}} />
    `);

    assert.ok(
      this.element.innerHTML.match(/foo\.com \(bar\)/),
      'component receives entity and other arguments'
    );
  });

  test('html safe tweets', async function (assert) {
    assert.expect(1);

    this.set('entities', {
      urls: [
        {
          url: 'http://t.co/foo',
          display_url: 'foo.com',
          indices: [13, 20]
        }
      ]
    });

    this.set('text', htmlSafe('<b>Visit</b> foo.com'));

    await render(hbs`
      <TwitterEntities
        @text={{this.text}}
        @entities={{this.entities}} />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      '<b>Visit</b> <a href="http://t.co/foo">foo.com</a>',
      'if the tweet is marked as safe, html can be output'
    );
  });
});
