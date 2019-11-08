# @zestia/ember-twitter-entities

<a href="https://badge.fury.io/js/%40zestia%2Fember-twitter-entities"><img src="https://badge.fury.io/js/%40zestia%2Fember-twitter-entities.svg" alt="npm version" height="18"></a> &nbsp; <a href="http://travis-ci.org/zestia/ember-twitter-entities"><img src="https://travis-ci.org/zestia/ember-twitter-entities.svg?branch=master"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-twitter-entities#badge-embed"><img src="https://david-dm.org/zestia/ember-twitter-entities.svg"></a> &nbsp; <a href="https://david-dm.org/zestia/ember-twitter-entities#dev-badge-embed"><img src="https://david-dm.org/zestia/ember-twitter-entities/dev-status.svg"></a> &nbsp; <a href="https://emberobserver.com/addons/@zestia/ember-twitter-entities"><img src="https://emberobserver.com/badges/-zestia-ember-twitter-entities.svg"></a>

This Ember CLI addon parses [Twitter Entities](https://dev.twitter.com/overview/api/entities-in-twitter-objects) from the Twitter API and renders a them as Ember Components.

## Installation

```
ember install @zestia/ember-twitter-entities
```

## Notes

This addon requires the [Babel Polyfill](https://github.com/babel/ember-cli-babel#polyfill) to correctly handle emojis.

## Example

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

## Customising

You can customise what components are used to render each type of entity:

```handlebars
<TwitterEntities
  @text={{tweet}}
  @entities={{entities}}
  @urlComponent={{component "x-link" target="_blank"}}
  @hashtagComponent="hash-tag"
  @userMentionComponent="user-mention"
  @mediaComponent="x-gallery/image" />
```

## HTML in tweets

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
