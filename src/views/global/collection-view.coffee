_ = require 'lodash'
Backbone = require 'backbone'
View = require 'views/global/view'

module.exports = class CollectionView extends View
  render: ->
    super
    @._renderChildren()

  _renderChildren: ->
    _.each @collection.models, (child, index) =>
      childView = new @['childView']({model: child})
      childView.render()
      @$el.find(@childViewContainer).append(childView.el)
