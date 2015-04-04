# ember-cli-twitter-entities

This Ember CLI addon parses Twitter Entities and renders a them as Ember Components. 

### Example

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
urlOptions: {
	target: '_self'
},
hashTagOptions: {
	classNames: ['hash-tag']
},
userMentionOptions: {
	title: Ember.computed.alias('entity.screen_name')
},
mediaOptions: {
	imageSize: 'large',
	target: '_twitter-image'
}
```

```
{{twitter-entities
  text="visit emberjs.com"
  entities=entities
  urlOptions=urlOptions
  hashTagOptions=hashTagOptions 
  useMentionOptions=userMentionOptions
  mediaOptions=mediaOptions}}
```