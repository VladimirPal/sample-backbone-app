Backbone = require 'backbone'

module.exports = class TableCollection extends Backbone.Collection
  url: '/api/contacts'
