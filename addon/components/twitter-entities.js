/* eslint-disable camelcase */

import Component from '@ember/component';
import layout from '../templates/components/twitter-entities';
import { htmlSafe, camelize } from '@ember/string';
import { compare } from '@ember/utils';
import { computed, getWithDefault } from '@ember/object';
const { keys } = Object;
const { from } = Array;

export default class TwitterEntitiesComponent extends Component {
  layout = layout;
  tagName = '';

  @computed('text', 'entities')
  get parts() {
    return this._generateParts(this.text, this.entities);
  }

  _generateParts(text, entities) {
    let parts = [];

    parts = this._entitiesToArray(entities);
    parts = this._textToArray(text, parts);

    if (this._isHTMLSafe(text)) {
      parts = this._markAsSafe(parts);
    }

    return parts;
  }

  _entitiesToArray(entities = {}) {
    const parts = [];

    keys(entities).forEach(key => {
      const typeEntities = getWithDefault(entities, key, []);

      typeEntities.forEach(entity => {
        const component = this._componentForType(key);
        parts.push({ component, entity });
      });
    });

    parts.sort((a, b) => compare(a.entity.indices[0], b.entity.indices[0]));

    return parts;
  }

  _textToArray(tweet = '', entityParts = []) {
    const parts = [];
    let text = '';
    let index = 0;

    tweet = tweet.toString();

    entityParts.forEach(part => {
      const [start, end] = part.entity.indices;
      text = from(tweet)
        .slice(index, start)
        .join('');

      if (text) {
        parts.push({ text });
      }

      parts.push(part);
      index = end;
    });

    text = from(tweet)
      .slice(index)
      .join('');

    if (text) {
      parts.push({ text });
    }

    return parts;
  }

  _markAsSafe(parts) {
    return parts.map(part => {
      if (part.text) {
        part.text = htmlSafe(part.text);
      }

      return part;
    });
  }

  _isHTMLSafe(string) {
    return string && typeof string.toHTML === 'function';
  }

  _componentForType(type) {
    const types = {
      urls: 'url',
      hashtags: 'hashtag',
      user_mentions: 'user-mention',
      media: 'media'
    };

    const name = types[type];
    const argName = camelize(`${name}Component`);

    return this[argName] || `twitter-entity/${name}`;
  }
}
