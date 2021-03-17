import Component from '@glimmer/component';
import { camelize, capitalize } from '@ember/string';
import { htmlSafe, isHTMLSafe } from '@ember/template';
import { compare } from '@ember/utils';
const { keys } = Object;
const { from } = Array;

export default class TwitterEntitiesComponent extends Component {
  get parts() {
    return this._generateParts(this.args.text, this.args.entities);
  }

  get isHTMLSafe() {
    return isHTMLSafe(this.args.text);
  }

  _generateParts(text, entities) {
    const componentParts = this._componentParts(entities);
    return this._restParts(text, componentParts);
  }

  _componentParts(entities = {}) {
    const parts = [];

    keys(entities).forEach((key) => {
      const typeEntities = entities[key] || [];

      typeEntities.forEach((entity) => {
        const Component = this._componentForType(key);
        parts.push({ Component, entity });
      });
    });

    parts.sort((a, b) => compare(a.entity.indices[0], b.entity.indices[0]));

    return parts;
  }

  _restParts(text, componentParts = []) {
    let index = 0;

    const chars = from(text.toString());
    const parts = [];

    const add = (start, end) => {
      let string = chars.slice(start, end).join('');

      if (!string) {
        return;
      }

      if (this.isHTMLSafe) {
        string = htmlSafe(string);
      }

      parts.push({ string });
    };

    componentParts.forEach((part) => {
      const [start, end] = part.entity.indices;

      add(index, start);

      if (part.Component) {
        parts.push(part);
      } else {
        add(start, end);
      }

      index = end;
    });

    add(index);

    return parts;
  }

  _componentForType(type) {
    const types = {
      urls: 'url',
      hashtags: 'hashtag',
      user_mentions: 'user-mention',
      media: 'media'
    };

    const name = types[type];

    if (!name) {
      return null;
    }

    const argName = capitalize(camelize(name));

    return this.args[argName] ?? `twitter-entity/${name}`;
  }
}
