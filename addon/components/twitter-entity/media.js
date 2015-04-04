import TwitterEntityComponent from '../twitter-entity';
import layout from '../../templates/components/twitter-entity/media';

export default TwitterEntityComponent.extend({
  layout: layout,
  imageSize: 'thumb',
  title: Ember.computed.alias('entity.expanded_url'),

  href: Ember.computed(function() {
    return this.get('entity.url');
  }),

  imageSrc: Ember.computed(function() {
    return this.get('entity.media_url_https') + ':' + this.get('imageSize');
  }),

  imageWidth: Ember.computed(function() {
    let size = this.get('imageSize');
    return this.get(`entity.sizes.${size}.w`);
  }),

  imageHeight: Ember.computed(function() {
    let size = this.get('imageSize');
    return this.get(`entity.sizes.${size}.h`);
  })
});
