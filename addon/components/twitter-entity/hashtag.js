import Component from '@ember/component';
/* eslint-disable */
import { computed } from '@ember/object';
/* eslint-enable */
import layout from '../../templates/components/twitter-entity/hashtag';

export default class HashtagComponent extends Component {
  layout = layout;
  tagName = '';

  @computed('entity.text')
  get href() {
    const hashtag = `#${this.entity.text}`;
    return `https://twitter.com/search?q=${encodeURIComponent(hashtag)}`;
  }
}
