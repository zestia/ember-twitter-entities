# ember-cli-twitter-entities

This Ember CLI addon parses [Twitter Entities](https://dev.twitter.com/overview/api/entities-in-twitter-objects) from the Twitter API and renders a them as Ember Components.

### Installation
```
ember install:addon ember-cli-twitter-entities
```

### Example usage

Given the following:

```
entities: {
  urls: [{
    url: 'https://t.co/emberjs',
    display_url: 'emberjs.com',
    indices: [6, 17]
  }],
  hashtags: [],
  user_mentions: [],
  media: []
}
```

```
{{twitter-entities text="visit emberjs.com" entities=entities}}
```

The addon will render:

```
visit <a href="http://t.co/emberjs">emberjs.com</a>
```

### Customising

You can customise what component is used to render each type of Twitter entity:

```
{{twitter-entities text=tweet entities=entities
  urlComponent='tweet-url'
  hashtagComponent='hash-tag'
  userMentionComponent='user-mention'
  mediaComponent='x-gallery/image'
```