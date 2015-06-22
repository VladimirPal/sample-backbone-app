Backbone = require 'backbone'

module.exports = class View extends Backbone.View
  render: ->
    $(@el).html @.template(@model? && @model.attributes)
    @
