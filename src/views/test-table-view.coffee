Backbone = require 'backbone'
View = require 'views/global/view'
CollectionView = require 'views/global/collection-view'

class TableItemView extends View
  template: Templates.test_table.table_item
  tagName: 'tr'

module.exports = class TestTableView extends CollectionView
  childView: TableItemView
  childViewContainer: 'tbody'
  template: Templates.test_table.table

  events:
    "click th" : "sort"

  initialize: ->
    @sortDest = {}

  sort: (ev)=>
    $target = $(ev.currentTarget)

    sortField = $target.data('sort_field')
    destination = @sortDest[sortField] ? 'abs'

    @collection.comparator = sortField
    @collection.sort()
    if destination is 'desc'
      destination = 'abs'
      @collection.models = @collection.models.reverse()
    else
      destination = 'desc'
    @render()

    @sortDest[sortField] = destination
