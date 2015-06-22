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

  sort: (ev)=>
    sortField = $(ev.target).data('sort_field')
    @collection.sortBy("-#{sortField}").reverese()
    @render()
