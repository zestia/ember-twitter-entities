import Component from '@glimmer/component';

export default class TwitterEntitiesSymbolComponent extends Component {
  get href() {
    const symbol = `$${this.args.entity.text}`;
    return `https://twitter.com/search?q=${encodeURIComponent(symbol)}`;
  }
}
