# ember-cli-twitter-entities

<a href="http://emberobserver.com/addons/ember-cli-twitter-entities"><img src="http://emberobserver.com/badges/ember-cli-twitter-entities.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-cli-twitter-entities#badge-embed"><img src="https://david-dm.org/amk221/ember-cli-twitter-entities.svg"></a> &nbsp; <a href="https://david-dm.org/amk221/ember-cli-twitter-entities#dev-badge-embed"><img src="https://david-dm.org/amk221/ember-cli-twitter-entities/dev-status.svg"></a> &nbsp; <a href="https://codeclimate.com/github/amk221/ember-cli-twitter-entities"><img src="https://codeclimate.com/github/amk221/ember-cli-twitter-entities/badges/gpa.svg" /></a> &nbsp; <a href="http://travis-ci.org/amk221/ember-cli-twitter-entities"><img src="https://travis-ci.org/amk221/ember-cli-twitter-entities.svg?branch=master"></a>

This Ember CLI addon parses [Twitter Entities](https://dev.twitter.com/overview/api/entities-in-twitter-objects) from the Twitter API and renders a them as Ember Components.

### Installation
```
ember install ember-cli-twitter-entities
```

### Example usage

Given the following:

```javascript
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

```handlebars
{{twitter-entities text="visit emberjs.com" entities=entities}}
```

The addon will render:

```html
visit <a href="http://t.co/emberjs">emberjs.com</a>
```

### Customising

If you want to display twitter entities differently to the defaults, simply extend the component and provide a different template:

```javascript
// components/twitter-entity/media/component.js

import Component from 'ember-cli-twitter-entities/components/twitter-entity/media';
import layout from './template';

export default Component.extend({ layout });
```
```handlebars
{{! components/twitter-entity/media/template.hbs }}

<img src={{entity.media_url_https}} width={{entity.sizes.thumb.w}} height={{entity.sizes.thumb.h}}>
```

Alternatively, you can customise the component on a per-instance basis.

```handlebars
{{twitter-entities text=tweet entities=entities
  url-component='tweet-url'
  hashtag-component='hash-tag'
  user-mention-component='user-mention'
  media-component='x-gallery/image'
```
