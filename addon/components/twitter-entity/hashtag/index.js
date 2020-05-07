import Component from '@glimmer/component';

export default class TwitterEntitiesHashtagComponent extends Component {
  get href() {
    const hashtag = `#${this.args.entity.text}`;
    return `https://twitter.com/search?q=${encodeURIComponent(hashtag)}`;
  }
}
