/* eslint-disable camelcase */

import Component from '@ember/component';
import layout from '../templates/components/twitter-entities';
import { htmlSafe } from '@ember/string';
import { compare } from '@ember/utils';
import { getWithDefault } from '@ember/object';
const { keys } = Object;
const { from } = Array;

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    const text     = this.text;
    const entities = this.entities;

    let parts = [];
    parts = this._entitiesToArray(entities);
    parts = this._textToArray(text, parts);

    if (this._isHTMLSafe(text)) {
      parts = this._makeSafe(parts);
    }

    this.set('parts', parts);
  },

  _entitiesToArray(entities = {}) {
    const parts = [];

    keys(entities).forEach(key => {
      const typeEntities = getWithDefault(entities, key, []);

      typeEntities.forEach(entity => {
        const component = this._componentForType(key);
        parts.push({ component, entity });
      });
    });

    parts.sort((a, b) => {
      return compare(a.entity.indices[0], b.entity.indices[0]);
    });

    return parts;
  },

  _textToArray(tweet = '', entityParts = []) {
    const parts = [];
    let text  = '';
    let index = 0;

    tweet = tweet.toString();

    entityParts.forEach(part => {
      const [start, end] = part.entity.indices;
      text = Array.from(tweet).slice(index, start).join('');

      if (text) {
        parts.push({ text });
      }

      parts.push(part);
      index = end;
    });

    text = from(tweet).slice(index).join('');

    if (text) {
      parts.push({ text });
    }

    return parts;
  },

  _makeSafe(parts) {
    return parts.map(part => {
      if (part.text) {
        part.text = htmlSafe(part.text);
      }

      return part;
    });
  },

  _isHTMLSafe(string) {
    return string && typeof string.toHTML === 'function';
  },

  _componentForType(type) {
    const types = {
      urls: 'url',
      hashtags: 'hashtag',
      user_mentions: 'userMention',
      media: 'media'
    };

    const name = types[type];

    return this[`${name}Component`] || `twitter-entity/${name}`;
  }
});
