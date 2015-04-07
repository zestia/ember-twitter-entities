import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('twitter-entities');

var urlText = 'Today, Twitter is updating embedded Tweets to enable a richer photo experience: https://t.co/XdXRudPXH5';
var urlEntities = [{
  url: 'https://t.co/XdXRudPXH5',
  expanded_url: 'https://blog.twitter.com/2013/rich-photo-experience-now-in-embedded-tweets-3',
  display_url: 'blog.twitter.com/2013/rich-phot\u2026',
  indices: [80, 103]
}];

var hashtagText = 'Loved #devnestSF';
var hashtagEntities = [{
  text: 'devnestSF',
  indices: [6, 16]
}];

var userMentionText = 'We\u2019re excited to work closely with the external technical community and continue @twittereng\u2019s work with open source. cc @TwitterOSS';
var userMentionEntities = [{
  screen_name: 'TwitterEng',
  name: 'Twitter Engineering',
  id: 6844292,
  id_str: '6844292',
  indices: [81, 92]
}, {
  screen_name: 'TwitterOSS',
  name: 'Twitter Open Source',
  id: 376825877,
  id_str: '376825877',
  indices: [121, 132]
}];

var mediaText = 'Four more years. http://t.co/bAJE6Vom';
var mediaEntities = [{
  id: 266031293949698048,
  id_str: '266031293949698048',
  indices: [17, 37],
  media_url: 'http://pbs.twimg.com/media/A7EiDWcCYAAZT1D.jpg',
  media_url_https: 'https://pbs.twimg.com/media/A7EiDWcCYAAZT1D.jpg',
  url: 'http://t.co/bAJE6Vom',
  display_url: 'pic.twitter.com/bAJE6Vom',
  expanded_url: 'http://twitter.com/BarackObama/status/266031293945503744/photo/1',
  type: 'photo',
  sizes: {
    medium: {
      w: 600,
      h: 399,
      resize: 'fit'
    },
    thumb: {
      w: 150,
      h: 150,
      resize: 'crop'
    },
    small: {
      w: 340,
      h: 226,
      resize: 'fit'
    },
    large: {
      w: 800,
      h: 532,
      resize: 'fit'
    }
  }
}];


test('no entities', function(assert) {
  assert.expect(1);

  let text = 'a plain old string';
  let component = this.subject({text});

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('>a plain old string<');

  assert.ok(regex.test(html));
});


test('url entities', function(assert) {
  assert.expect(1);

  let component = this.subject({
    text: urlText,
    entities: {
      urls: urlEntities
    },
    options: {
      url: {
        classNames: ['foo-url']
      }
    }
  });

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('Today, Twitter is updating embedded Tweets to enable a richer photo experience: <a id="[^"]+" class=".*foo-url" title="https://blog.twitter.com/2013/rich-photo-experience-now-in-embedded-tweets-3" href="https://t.co/XdXRudPXH5" target="_blank">blog.twitter.com/2013/rich-phot…</a>');

  assert.ok(regex.test(html));
});


test('hashtag entities', function(assert) {
  assert.expect(1);

  let component = this.subject({
    text: hashtagText,
    entities: {
      hashtags: hashtagEntities
    },
    options: {
      hashTag: {
        classNames: ['foo-hashtag']
      }
    }
  });

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('Loved <a id="[^"]+" class=".*foo-hashtag" href="https://twitter.com/search\\?q=\\%23devnestSF" target="_blank">#devnestSF</a>');

  assert.ok(regex.test(html));
});


test('user mention entities', function(assert) {
  assert.expect(1);

  let component = this.subject({
    text: userMentionText,
    entities: {
      user_mentions: userMentionEntities
    },
    options: {
      userMention: {
        classNames: ['foo-user-mention']
      }
    }
  });

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('We’re excited to work closely with the external technical community and continue <a id="[^"]+" class=".*foo-user-mention" href="https://twitter.com/TwitterEng" target="_blank">@TwitterEng</a>’s work with open source. cc <a id="[^"]+" class=".*foo-user-mention" href="https://twitter.com/TwitterOSS" target="_blank">@TwitterOSS</a>');

  assert.ok(regex.test(html));
});


test('media entities', function(assert) {
  assert.expect(1);

  let component = this.subject({
    text: mediaText,
    entities: {
      media: mediaEntities
    },
    options: {
      media: {
        imageSize: 'large',
        classNames: ['foo-image']
      }
    }
  });

  this.render();

  let html = component.get('element').outerHTML;
  let regex = new RegExp('Four more years. <a id="[^"]+" class=".*foo-image" title="http://twitter.com/BarackObama/status/266031293945503744/photo/1" href="http://t.co/bAJE6Vom" target="_blank"><img src="https://pbs.twimg.com/media/A7EiDWcCYAAZT1D.jpg:large" width="800" height="532"></a>');

  assert.ok(regex.test(html));
});