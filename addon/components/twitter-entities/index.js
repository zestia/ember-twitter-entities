import Component from '@glimmer/component';
import { htmlSafe, isHTMLSafe } from '@ember/template';
import { compare } from '@ember/utils';
import Components from './components';
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
          Component: this._componentForType(type)
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
    switch (type) {
      case 'urls':
        return this.args.Url ?? Components.Url;
      case 'hashtags':
        return this.args.Hashtag ?? Components.Hashtag;
      case 'user_mentions':
        return this.args.UserMention ?? Components.UserMention;
      case 'media':
        return this.args.Media ?? Components.Media;
      case 'symbols':
        return this.args.Symbol ?? Components.Symbol;
    }
  }
}
