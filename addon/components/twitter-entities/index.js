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

  _generateParts(text, entities) {
    const entityParts = this._entityParts(entities);
    return this._restParts(text, entityParts);
  }

  _entityParts(entities) {
    const parts = [];

    keys(entities).forEach((type) => {
      entities[type].forEach((entity) => {
        parts.push({
          entity,
          component: this._componentForType(type)
        });
      });
    });

    parts.sort((a, b) => compare(a.entity.indices[0], b.entity.indices[0]));

    return parts;
  }

  _restParts(text, entityParts) {
    let index = 0;

    const isSafe = isHTMLSafe(text);
    const chars = from(text.toString());
    const parts = [];

    const add = (start, end) => {
      let string = chars.slice(start, end).join('');

      if (!string) {
        return;
      }

      if (isSafe) {
        string = htmlSafe(string);
      }

      parts.push({ string });
    };

    entityParts.forEach((part) => {
      const [start, end] = part.entity.indices;

      add(index, start);

      if (part.component) {
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
      media: 'media',
      symbols: 'symbol'
    };

    const name = types[type];

    if (!name) {
      return null;
    }

    const argName = capitalize(camelize(name));

    return this.args[argName] ?? `twitter-entity/${name}`;
  }
}
