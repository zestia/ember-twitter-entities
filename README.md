# ember-cli-twitter-entities

This Ember CLI addon parses [Twitter Entities](https://dev.twitter.com/overview/api/entities-in-twitter-objects) from the Twitter API and renders a them as Ember Components. 

### Installation
```
ember install:addon ember-cli-twitter-entities
```

### Example usage

Given the following entities:

```
entities: {
  urls: [{
    url: 'https://t.co/emberjs',
    display_url: 'emberjs.com',
    expanded_url: 'http://emberjs.com',
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
visit <a id="ember123" class="ember-view" href="http://t.co/emberjs" target="_blank">emberjs.com</a>
```

### Options

You can pass in options for each type of entity, for example:

```
options: {
	url: {
		target: '_self'
	},
	hashTag: {
		classNames: ['hash-tag']
	},
	userMention: {
		title: Ember.computed.alias('entity.screen_name')
	},
	media: {
		imageSize: 'large',
		target: '_twitter-image'
	}
}
```

```
{{twitter-entities
  text="hello @world"
  entities=entities
  options=options}}
```