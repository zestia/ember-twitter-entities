/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-twitter-entities',

  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/unicode-string-utils/unicode-string-utils.js');
  }
};
