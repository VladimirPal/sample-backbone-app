$ = require 'jquery'
window.jQuery = $
window.$ = $

Backbone = require 'backbone'
Backbone.$ = require 'jquery'

require 'bootstrap'

Handlebars = require 'handlebars'
window.Templates = require 'templates/templates_build.js'

BaseView = require 'views/base-view'
TestTableView = require 'views/test-table-view'
TableCollection = require 'models/table-collection'

class App extends Backbone.Router
  routes: {
    "": "myTable"
  },

  myTable: ->
    tableCollection = new TableCollection()
    tableCollection.fetch().then =>
      testTableView = new TestTableView({el: '#content-area', collection: tableCollection})
      testTableView.render()

  initialize: ->
    # --- Base layout -----
    @baseView = new BaseView({el: '#application'})
    @baseView.render()
    # --- Base layout -----

$ ->
  window.App = new App()
  if Backbone.history
    Backbone.history.start()
