Backbone = require 'backbone'
View = require 'views/global/view'

module.exports = class BaseView extends View
  template: Templates.base
  id: 'wrapper'
