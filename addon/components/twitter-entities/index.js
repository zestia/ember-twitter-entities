import Component from '@glimmer/component';
import { htmlSafe, camelize } from '@ember/string';
import { compare } from '@ember/utils';
const { keys } = Object;
const { from } = Array;

export default class TwitterEntitiesComponent extends Component {
  get parts() {
    return this._generateParts(this.args.text, this.args.entities);
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

    keys(entities).forEach((key) => {
      const typeEntities = entities[key] || [];
      const Component = this._componentForType(key);

      typeEntities.forEach((entity) => {
        parts.push({ Component, entity });
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

    entityParts.forEach((part) => {
      const [start, end] = part.entity.indices;
      text = from(tweet).slice(index, start).join('');

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
  }

  _markAsSafe(parts) {
    return parts.map((part) => {
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
      user_mentions: 'userMention',
      media: 'media'
    };

    return this.args[types[type]];
  }
}
