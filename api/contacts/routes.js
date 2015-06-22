var Backbone = require('backbone');
var fixture = require('./fixture');
var collection = new Backbone.Collection(fixture);

module.exports = function(api) {
  api.route('/api/contacts')
    .get(function(req, res) {
      res.json(collection);
    });
};
