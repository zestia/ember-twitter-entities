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
        @entities={{this.entities}}
        @url={{component "twitter-entity/url"}}
        @hashtag={{component "twitter-entity/hashtag"}}
        @userMention={{component "twitter-entity/user-mention"}}
        @media={{component "twitter-entity/media"}}
      />
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

  test('optional behaviour', async function (assert) {
    assert.expect(1);

    this.set('entities', {
      media: [
        {
          url: 'http://t.co/foo',
          display_url: 'pic.twitter.com/foo',
          indices: [12, 27]
        }
      ]
    });

    await render(hbs`
      <TwitterEntities
        @text="Amazing pic http://t.co/foo"
        @entities={{this.entities}} />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      'Amazing pic <!---->',
      'does not render entity if there is no component to render it'
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
        @entities={{this.entities}}
        @url={{component "twitter-entity/url"}} />
    `);

    assert.equal(
      this.element.innerHTML.trim(),
      '<b>Visit</b> <a href="http://t.co/foo">foo.com</a>',
      'if the tweet is marked as safe, html can be output'
    );
  });
});
