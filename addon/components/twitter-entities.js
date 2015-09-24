import Ember from 'ember';
import Component from 'ember-component';
import layout from '../templates/components/twitter-entities';

const { compare, getWithDefault } = Ember;
const { slice } = window.unicodeStringUtils;

export default Component.extend({
  layout: layout,

  didInitAttrs() {
    let parts = [];
    parts = this._entitiesToArray(this.getAttr('entities'));
    parts = this._textToArray(this.getAttr('text'), parts);
    this.set('parts', parts);
  },

  _entitiesToArray(entities = {}) {
    let parts = [];

    Object.keys(entities).forEach((key) => {
      let typeEntities = getWithDefault(entities, key, []);

      typeEntities.forEach((entity) => {
        let component = this._nameForType(key);
        parts.push({ component, entity });
      });
    });

    parts.sort((a, b) => {
      return compare(a.entity.indices[0], b.entity.indices[0]);
    });

    return parts;
  },

  _textToArray(tweet = '', entityParts = []) {
    let text  = '';
    let parts = [];
    let index = 0;

    entityParts.forEach((part) => {
      let [start, end] = part.entity.indices;
      text = slice(tweet, index, start);

      if (text) { parts.push({ text }); }

      parts.push(part);
      index = end;
    });

    text = slice(tweet, index);
    if (text) { parts.push({ text }); }

    return parts;
  },

  _nameForType(type) {
    if (type === 'urls') {
      return this.getAttr('urlComponent') || 'twitter-entity/url';
    } else if (type === 'hashtags') {
      return this.getAttr('hashtagComponent') || 'twitter-entity/hashtag';
    } else if (type === 'user_mentions') {
      return this.getAttr('userMentionComponent') || 'twitter-entity/user-mention';
    } else if (type === 'media') {
      return this.getAttr('mediaComponent') || 'twitter-entity/media';
    }
  }

});
