# @zestia/ember-twitter-entities

<a href="https://badge.fury.io/js/%40zestia%2Fember-twitter-entities"><img src="https://badge.fury.io/js/%40zestia%2Fember-twitter-entities.svg" alt="npm version" height="18"></a> &nbsp; <a href="http://travis-ci.org/zestia/ember-twitter-entities"><img src="https://travis-ci.org/zestia/ember-twitter-entities.svg?branch=master"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-twitter-entities#badge-embed"><img src="https://david-dm.org/zestia/ember-twitter-entities.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-twitter-entities#dev-badge-embed"><img src="https://david-dm.org/zestia/ember-twitter-entities/dev-status.svg"></a> &nbsp; <a href="http://emberobserver.com/addons/ember-twitter-entities"><img src="http://emberobserver.com/badges/ember-twitter-entities.svg"></a> 

This Ember CLI addon parses [Twitter Entities](https://dev.twitter.com/overview/api/entities-in-twitter-objects) from the Twitter API and renders a them as Ember Components.

### Installation
```
ember install @zestia/ember-twitter-entities
```

### Notes

This addon requires the [Babel Polyfill](https://github.com/babel/ember-cli-babel#polyfill) to correctly handle emojis.

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
<TwitterEntities
  @text="visit emberjs.com"
  @entities={{entities}} />
```

The addon will render:

```html
visit <a href="http://t.co/emberjs">emberjs.com</a>
```

### Customising

If you want to display twitter entities differently to the defaults, simply extend the component and provide a different template:

```javascript
// components/twitter-entity/media/component.js

import Component from '@zestia/ember-twitter-entities/components/twitter-entity/media';
import layout from './template';

export default Component.extend({ layout });
```
```handlebars
{{! components/twitter-entity/media/template.hbs }}

<img src={{this.entity.media_url_https}} width={{this.entity.sizes.thumb.w}} height={{this.entity.sizes.thumb.h}}>
```

Alternatively, you can customise the component on a per-instance basis.

```handlebars
<TwitterEntities
  @text={{tweet}}
  @entities={{entities}}
  @urlComponent="tweet-url"
  @hashtagComponent="hash-tag"
  @userMentionComponent="user-mention"
  @mediaComponent="x-gallery/image" />
```
You can even pass in a component

```handlebars
<TwitterEntities
  @text={{text}}
  @entities={{entities}}
  @urlComponent={{component "my-component" target="_blank"}} />
```

### HTML in tweets

If the tweet you are rendering is already encoded, flag it as html-safe to prevent double encoding.

```javascript
const tweet = 'This tweet contains &lt;br&gt; HTML';
this.set('text', htmlSafe(tweet));
```

```handlebars
<TwitterEntities @text={{text}} />
```

```
Outputs:    This tweet contains <br> HTML
Instead of: This tweet contains &lt;br&gt; HTML
```
