var Handlebars = require("handlebars");
 module.exports["base"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div id=\"page-wrapper\" class=\"gray-bg\">\n  <div class=\"row border-bottom\">\n    <nav class=\"navbar navbar-static-top\" role=\"navigation\" style=\"margin-bottom:0px;\">\n      <div class=\"navbar-header\">Test header</div>\n    </nav>\n  </div>\n\n  <div id=\"content-area\" class=\"wrapper wrapper-content\"></div>\n\n  <div class=\"footer\">\n    <div class=\"pull-right\">\n      <span>Test Footer</span>\n    </div>\n  </div>\n\n</div>\n";
  },"useData":true});
module.exports["test_table"] = module.exports["test_table"] || {};
module.exports["test_table"]["table"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-lg-12\">\n  <div class=\"ibox-content\">\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th data-sort_field=\"id\">#</th>\n          <th id=\"desc\" data-sort_field=\"name\">Name</th>\n        </tr>\n      </thead>\n      <tbody></tbody>\n    </table>\n  </div>\n</div>\n";
  },"useData":true});
module.exports["test_table"]["table_item"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<td>"
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "</td>\n<td>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n";
},"useData":true});