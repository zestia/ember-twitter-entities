import Ember from 'ember';
import factories from '../factories';

export default Ember.ContainerView.extend({
  text: '',
  entities: {},

  types: {
    urls: 'Url',
    hashtags: 'HashTag',
    user_mentions: 'UserMention',
    media: 'Media'
  },

  urlOptions: {},
  hashTagOptions: {},
  userMentionOptions: {},
  mediaOptions: {},

  init() {
    this._super();

    let parts = this.getParts();

    if (parts) {
      this.addParts(parts);
    } else {
      this.addText(this.get('text'));
    }
  },

  getParts() {
    let parts = [];
    let entities = this.get('entities');

    Object.keys(entities).forEach((key) => {
      let typeEntities = Ember.getWithDefault(entities, key, []);

      typeEntities.forEach((entity) => {
        let type = this.get(`types.${key}`);
        parts.push({type, entity});
      });
    });

    return parts.sort((a, b) => {
      return a.start - b.start;
    });
  },

  addText(text) {
    this.pushObject(factories.PlainText.create({text}));
  },

  addPart(part) {
    let {type, entity} = part;
    let options = this.optionsForType(type);
    let Component = factories[type].extend(options);

    this.pushObject(Component.create({entity}));
  },

  addParts(parts) {
    let index = 0;
    let text = this.get('text');

    parts.forEach((part) => {
      let entity = part.entity;
      let start = entity.indices[0];
      let end = entity.indices[1];
      this.addText(text.substring(index, start));
      this.addPart(part);
      index = end;
    })

    this.addText(text.substring(index, text.length));
  },

  optionsForType(type) {
    type = Ember.String.camelize(type);
    return this.get(`${type}Options`);
  },

});
