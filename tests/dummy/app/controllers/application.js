/* eslint-disable max-len, camelcase */

import Ember from 'ember';

export default Ember.Controller.extend({
  urlsExample: 'Today, Twitter is updating embedded Tweets to enable a richer photo experience: https:\/\/t.co\/XdXRudPXH5',
  urlsExampleEntities: {
    hashtags: [],
    symbols: [],
    urls: [{
      url: 'https:\/\/t.co\/XdXRudPXH5',
      expanded_url: 'https:\/\/blog.twitter.com\/2013\/rich-photo-experience-now-in-embedded-tweets-3',
      display_url: 'blog.twitter.com\/2013\/rich-phot\u2026',
      indices: [80, 103]
    }],
    user_mentions: []
  },

  hashtagsExample: 'Loved #devnestSF',
  hashtagsExampleEntities: {
    hashtags: [{
      text: 'devnestSF',
      indices: [6, 16]
    }],
    symbols: [],
    urls: [],
    user_mentions: []
  },

  userMentionsExample: 'We\u2019re excited to work closely with the external technical community and continue @twittereng\u2019s work with open source. cc @TwitterOSS',
  userMentionsExampleEntities: {
    hashtags: [],
    symbols: [],
    urls: [],
    user_mentions: [{
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
    }]
  },

  mediaExample: 'Four more years. http:\/\/t.co\/bAJE6Vom',
  mediaExampleEntities: {
    hashtags: [],
    symbols: [],
    urls: [],
    user_mentions: [],
    media: [{
      id: 266031293949698048,
      id_str: '266031293949698048',
      indices: [17, 37],
      media_url: 'http:\/\/pbs.twimg.com\/media\/A7EiDWcCYAAZT1D.jpg',
      media_url_https: 'https:\/\/pbs.twimg.com\/media\/A7EiDWcCYAAZT1D.jpg',
      url: 'http:\/\/t.co\/bAJE6Vom',
      display_url: 'pic.twitter.com\/bAJE6Vom',
      expanded_url: 'http:\/\/twitter.com\/BarackObama\/status\/266031293945503744\/photo\/1',
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
    }]
  }
});
