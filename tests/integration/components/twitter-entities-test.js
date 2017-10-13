/* eslint-disable camelcase, indent */

import Component from '@ember/component';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { htmlSafe } from '@ember/string';

moduleForComponent('twitter-entities', {
  integration: true
});


test('it renders', function(assert) {
  assert.expect(1);

  this.set('text', [
    'url1: url1',
    'url2: url2',
    'hashtag1: hashtag1',
    'user mention: user mention',
    'media: media',
    'html: <script>',
    'emojis: 💥 hashtag2',
    'trailing: text'
  ].join('\n'));

  this.set('entities', {
    urls: [{
      url: 'http://t.co/url2',
      display_url: 'url2.com',
      indices: [17, 21]
    }, {
      url: 'http://t.co/url1',
      display_url: 'url1.com',
      indices: [6, 10]
    }],
    hashtags: [{
      text: 'hashtag2',
      indices: [106, 114]
    }, {
      text: 'hashtag1',
      indices: [32, 40]
    }],
    user_mentions: [{
      screen_name: 'baz',
      indices: [55, 67]
    }],
    media: [{
      url: 'http://t.co/qux',
      display_url: 'pic.twitter.com/qux',
      indices: [75, 80]
    }]
  });

  this.render(hbs`{{twitter-entities text=text entities=entities}}`);

  assert.equal(
    this.$('> div').html(),
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


test('custom entity components', function(assert) {
  assert.expect(4);

  const CustomURL = Component.extend({
    layout: hbs`custom url: {{entity.display_url}}`
  });

  const CustomHashtag = Component.extend({
    layout: hbs`custom hashtag: {{entity.text}}`
  });

  const CustomUserMention = Component.extend({
    layout: hbs`custom user mention: {{entity.screen_name}}`
  });

  const CustomMedia = Component.extend({
    layout: hbs`custom media: <img src={{entity.media_url_https}}>`
  });

  this.registry.register('component:custom-url', CustomURL);
  this.registry.register('component:custom-hashtag', CustomHashtag);
  this.registry.register('component:custom-user-mention', CustomUserMention);
  this.registry.register('component:custom-media', CustomMedia);

  this.set('text', [
    'url: url',
    'hashtag: hashtag',
    'user mention: user mention',
    'media: media'
  ].join('\n'));

  this.set('entities', {
    urls: [{
      url: 'http://t.co/foo',
      display_url: 'foo.com',
      indices: [5, 8]
    }],
    hashtags: [{
      text: 'bar',
      indices: [18, 25]
    }],
    user_mentions: [{
      screen_name: 'baz',
      indices: [40, 52]
    }],
    media: [{
      url: 'http://t.co/qux',
      display_url: 'pic.twitter.com/qux',
      media_url_https: 'https://pbs.twimg.com/media/qux.jpg',
      indices: [60, 65]
    }]
  });

  this.render(hbs`
    {{twitter-entities
      text=text
      entities=entities
      url-component='custom-url'
      hashtag-component='custom-hashtag'
      user-mention-component='custom-user-mention'
      media-component='custom-media'}}
  `);

  const $el = this.$('> div');

  assert.equal($el.children('div:eq(0)').html(), 'custom url: foo.com');
  assert.equal($el.children('div:eq(1)').html(), 'custom hashtag: bar');
  assert.equal($el.children('div:eq(2)').html(), 'custom user mention: baz');
  assert.equal(
    $el.children('div:eq(3)').html(),
    'custom media: <img src="https://pbs.twimg.com/media/qux.jpg">'
  );

});



test('passing in custom components', function(assert) {
  assert.expect(1);

  const CustomURL = Component.extend({
    layout: hbs`{{entity.display_url}} ({{foo}})`
  });

  this.set('entities', {
    urls: [{
      url: 'http://t.co/foo',
      display_url: 'foo.com',
      indices: [6, 11]
    }]
  });

  this.register('component:custom-url', CustomURL);

  this.render(hbs`
    {{twitter-entities
      text='Hello World'
      entities=entities
      url-component=(component 'custom-url' foo='bar')}}
  `);

  assert.ok(this.$().html().match(/foo\.com \(bar\)/),
    'component receives entity and attrs');
});


test('html safe tweets', function(assert) {
  assert.expect(1);

  this.set('entities', {
    urls: [{
      url: 'http://t.co/foo',
      display_url: 'foo.com',
      indices: [13, 20]
    }]
  });

  this.set('text', htmlSafe('<b>Visit</b> foo.com'));

  this.render(hbs`
    {{twitter-entities text=text entities=entities}}
  `);

  assert.equal(this.$('> div').html(),
    '<b>Visit</b> <a href="http://t.co/foo">foo.com</a>',
    'if the tweet is marked as safe, html can be output');
});
