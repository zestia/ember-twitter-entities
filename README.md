# @zestia/ember-twitter-entities

[![Latest npm release][npm-badge]][npm-badge-url]
[![Ember Observer][ember-observer-badge]][ember-observer-url]

<!-- [![GitHub Actions][github-actions-badge]][github-actions-url] -->

[npm-badge]: https://img.shields.io/npm/v/@zestia/ember-twitter-entities.svg
[npm-badge-url]: https://www.npmjs.com/package/@zestia/ember-twitter-entities
[github-actions-badge]: https://github.com/zestia/ember-twitter-entities/workflows/CI/badge.svg
[github-actions-url]: https://github.com/zestia/ember-twitter-entities/actions
[ember-observer-badge]: https://emberobserver.com/badges/-zestia-ember-twitter-entities.svg
[ember-observer-url]: https://emberobserver.com/addons/@zestia/ember-twitter-entities

This Ember CLI addon parses [Twitter Entities](https://dev.twitter.com/overview/api/entities-in-twitter-objects) from the Twitter API and renders a them as Ember Components.

## Installation

```
ember install @zestia/ember-twitter-entities
```

## Demo

https://zestia.github.io/ember-twitter-entities

## Notes

- Supported entity types are: `hashtags`, `media`, `urls`, `user_mentions`, `symbols`. Basically any entity which has an `indices` property and occurs in the tweet text. So this excludes `polls`.

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
  media: [],
  symbols: []
}
```

```handlebars
<TwitterEntities @text='visit emberjs.com' @entities={{this.entities}} />
```

The addon will render:

```html
visit <a href="http://t.co/emberjs">emberjs.com</a>
```

...using the built in components for each entity type.

## Arguments

### `@text`

Required. The text to parse to find entities within.

### `@entities`

Required. An object of entities that each include information about where each entities appears within the `@text`.

### `@Url`

Optional. The component that will be used to display a URL entity.

### `@Hashtag`

Optional. The component that will be used to display a hashtag entity.

### `@UserMention`

Optional. The component that will be used to display a user mention entity.

### `@Media`

Optional. The component that will be used to display a media entity.

### `@Symbol`

Optional. The component that will be used to display a symbol entity.

## API

### `entity`

Each component receives the entity so it can be displayed however you wish.

## HTML in tweets

If the tweet you are rendering is already encoded, flag it as html-safe to prevent double encoding.

```javascript
const tweet = 'This tweet contains &lt;br&gt; HTML';
this.text = htmlSafe(tweet);
```

```handlebars
<TwitterEntities @text={{this.text}} />
```

```
Outputs:    This tweet contains <br> HTML
Instead of: This tweet contains &lt;br&gt; HTML
```
