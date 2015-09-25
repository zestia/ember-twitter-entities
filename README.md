# ember-cli-twitter-entities

This Ember CLI addon parses [Twitter Entities](https://dev.twitter.com/overview/api/entities-in-twitter-objects) from the Twitter API and renders a them as Ember Components.

### Installation
```
ember install ember-cli-twitter-entities
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

If you want to display twitter entities differently to the defaults, simply extend the component and provide a different template:

```
// components/twitter-entity/media/component.js

import Component from 'ember-cli-twitter-entities/components/twitter-entity/media';
import layout from './template';

export default Component.extend({ layout });
```
```
{{! components/twitter-entity/media/template.hbs }}

<img src={{entity.media_url_https}} width={{entity.sizes.thumb.w}} height={{entity.sizes.thumb.h}}>
```

Alternatively, you can customise the component on a per-instance basis.

```
{{twitter-entities text=tweet entities=entities
  url-component='tweet-url'
  hashtag-component='hash-tag'
  user-mention-component='user-mention'
  media-component='x-gallery/image'
```